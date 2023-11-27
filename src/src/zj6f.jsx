import React, { useState, useEffect } from "react";
import { FloatButton, Dropdown, Progress, Space, Spin } from "antd";
import { DownSquareOutlined, RetweetOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { LoadingManager } from "three";

import { Capsule } from "three/examples/jsm/math/Capsule.js";

import { Octree } from "three/examples/jsm/math/Octree.js";
import { OctreeHelper } from "three/examples/jsm/helpers/OctreeHelper.js";

import TWEEN from "@tweenjs/tween.js";

const items = [
  {
    key: "1",
    label: <Link to="../hm3f">花木3楼</Link>,
  },
  {
    key: "2",
    label: <Link to="../hm17f">花木17楼</Link>,
  },
  {
    key: "3",
    label: <Link to="../zj6f">张江6楼</Link>,
  },
];

const Zj6f = () => {
  let renderer, camera, scene;
  let clock;

  //  player
  const player = {
    geometry: new Capsule(
      new THREE.Vector3(-1.35, 10.35, 0.08),
      new THREE.Vector3(-1.35, 10.5, 0.08),
      0.15
    ),
    velocity: new THREE.Vector3(),
    direction: new THREE.Vector3(),
  };

  //  controls
  let keyStates = {};

  const worldOctree = new Octree();

  let mouseTime;

  // progress
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    init();
    loadCollision();
    loadModel();
    resetPlayer();
  }, []);

  function init() {
    initRenderer();
    initCamera();
    initScene();
    initLight();
    addEvent();

    //  clock
    clock = new THREE.Clock();
  }
  function initRenderer() {
    //  renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    document.body.appendChild(renderer.domElement);
  }

  function initCamera() {
    //  camera
    camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.rotation.order = "YXZ";
  }

  function initScene() {
    //  scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x88ccee);
    scene.add(new THREE.AxesHelper(10));
  }

  function initLight() {
    //  light
    const fillLight1 = new THREE.HemisphereLight(0x8dc1de, 0x00668d, 3.5);
    fillLight1.position.set(2, 1, 1);
    scene.add(fillLight1);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
    directionalLight.position.set(-5, 25, -1);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.near = 0.01;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadow.camera.right = 30;
    directionalLight.shadow.camera.left = -30;
    directionalLight.shadow.camera.top = 30;
    directionalLight.shadow.camera.bottom = -30;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.radius = 4;
    directionalLight.shadow.bias = -0.00006;
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 2.5);
    pointLight1.position.set(-1.3, 0.6, -0.85);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 2.5);
    pointLight2.position.set(-1.3, 0.6, 1.38);
    scene.add(pointLight2);
  }

  function addEvent() {
    //  event
    window.addEventListener("resize", onWindowResize);

    document.addEventListener("keydown", (event) => {
      keyStates[event.code] = true;
    });

    document.addEventListener("keyup", (event) => {
      keyStates[event.code] = false;
    });

    //  mouse down <=> esc
    document.querySelector("canvas").addEventListener("mousedown", () => {
      document.body.requestPointerLock();

      mouseTime = performance.now();
    });

    document.addEventListener("mouseup", () => {
      if (document.pointerLockElement !== null);
    });

    document.body.addEventListener("mousemove", (event) => {
      if (document.pointerLockElement === document.body) {
        camera.rotation.y -= event.movementX / 500;
        camera.rotation.x -= event.movementY / 500;
      }
    });

    window.addEventListener("resize", onWindowResize);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function loadCollision() {
    const collision_loader = new GLTFLoader(new LoadingManager()); //实时显示进度
    collision_loader.setPath("./models/collision/");

    collision_loader.load(
      "张江6楼 - Only墙体1.glb",
      (gltf) => {
        worldOctree.fromGraphNode(gltf.scene);

        const helper = new OctreeHelper(worldOctree);
        helper.visible = flase;
        scene.add(helper);

        animate();
      },
      (xhr) => {
        //处理加载的进度
        console.log(Number(((xhr.loaded / xhr.total) * 100).toFixed(2)) + "%");
      },
      (error) => {
        //加载错误时触发
        console.log(error);
      }
    );
  }

  function loadModel() {
    const model_loader = new GLTFLoader(new LoadingManager()); //实时显示进度
    model_loader.setPath("./models/scene/");

    model_loader.load(
      "张江6楼.glb",
      (gltf) => {
        scene.add(gltf.scene);
        setIsLoading(false);

        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child.material.map) {
              child.material.map.anisotropy = 4;
            }
          }
        });

        animate();
      },
      (xhr) => {
        //处理加载的进度
        setProgress(Number(((xhr.loaded / xhr.total) * 100).toFixed(0)));
      },
      (error) => {
        //加载错误时触发
        console.log(error);
      }
    );
  }

  //  animate
  function animate() {
    const deltaTime = Math.min(0.05, clock.getDelta());

    handleControls(deltaTime);

    updatePlayer(deltaTime);

    renderer.render(scene, camera);

    requestAnimationFrame(animate);

    TWEEN.update();
  }

  function handleControls(deltaTime) {
    const speedDelta = deltaTime * 5;

    if (keyStates["KeyW"] || keyStates["ArrowUp"]) {
      player.velocity.add(getForwardVector().multiplyScalar(speedDelta));
    }

    if (keyStates["KeyS"] || keyStates["ArrowDown"]) {
      player.velocity.add(getForwardVector().multiplyScalar(-speedDelta));
    }

    if (keyStates["KeyA"] || keyStates["ArrowLeft"]) {
      player.velocity.add(getSideVector().multiplyScalar(-speedDelta));
    }

    if (keyStates["KeyD"] || keyStates["ArrowRight"]) {
      player.velocity.add(getSideVector().multiplyScalar(speedDelta));
    }

    if (keyStates["KeyR"]) {
      resetPlayer();
    }

    if (keyStates["KeyV"]) {
      animateCamera();
    }

    if (keyStates["Space"]) {
      player.velocity.y += 10;
    }
  }

  function getForwardVector() {
    camera.getWorldDirection(player.direction);
    player.direction.y = 0;
    player.direction.normalize();

    return player.direction;
  }

  function getSideVector() {
    camera.getWorldDirection(player.direction);
    player.direction.y = 0;
    player.direction.normalize();
    player.direction.cross(camera.up);

    return player.direction;
  }

  function updatePlayer(deltaTime) {
    let damping = Math.exp(-4 * deltaTime) - 1;

    player.velocity.addScaledVector(player.velocity, damping);

    const deltaPosition = player.velocity.clone().multiplyScalar(deltaTime);
    player.geometry.translate(deltaPosition);

    playerCollisions();

    camera.position.copy(player.geometry.end);
    console.log(camera.position);
  }

  function playerCollisions() {
    const result = worldOctree.capsuleIntersect(player.geometry);

    if (result) {
      player.geometry.translate(result.normal.multiplyScalar(result.depth));
    }
  }

  function resetPlayer() {
    player.geometry.start.set(-1.35, 0.35, 0.08);
    player.geometry.end.set(-1.35, 0.5, 0.08);
    player.geometry.radius = 0.15;
    camera.position.copy(player.geometry.end);
    camera.rotation.set(0, 0, 0);
  }

  function animateCamera() {
    const tween = new TWEEN.Tween(player.velocity).to({ y: -10 }, 1000).start();
  }

  return (
    <>
      {isLoading ? (
        <Space direction="vertical">
          <Spin tip="Loading"></Spin>
          <Progress percent={progress} size={[300, 20]} />
        </Space>
      ) : null}
      <Dropdown
        menu={{
          items,
        }}
        placement="bottomLeft"
      >
        <FloatButton
          icon={<DownSquareOutlined />}
          style={{ left: 24, top: 24 }}
        ></FloatButton>
      </Dropdown>
      <FloatButton
        icon={<RetweetOutlined />}
        style={{ right: 24, top: 24 }}
      ></FloatButton>
    </>
  );
};

export default Zj6f;
