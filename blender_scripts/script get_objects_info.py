import bpy
from mathutils import *
import re

D = bpy.data
C = bpy.context

seats_info_file = '/Users/chenxiaoxiong/Workspace/ImmersiveOffice/public/assets/hm3f_seat_info.json'
seat_objs = list(filter(lambda obj: re.match(r'seat\.[0-9]+', obj.name, re.I), C.visible_objects))
# 打开一个新文件或者清空现有文件以写入坐标
with open(seats_info_file, 'w') as f:
    f.write('[\n')
    # 遍历当前场景中所有选中的物体
    for i, obj in enumerate(seat_objs):
        # 获取物体的全局位置
        location = obj.location
        rotation_euler = obj.rotation_euler

        f.write('{')
        f.write(f'"name": "{obj.name}",')
        f.write(f'"position": [{location.x},{location.y},{location.z}],')
        f.write(f'"rotation_euler": [{rotation_euler.x}, {rotation_euler.y}, {rotation_euler.z}]')
        f.write('}')
        if i == len(seat_objs) - 1:
            f.write("\n")
        else:
            f.write(",\n")
    f.write(']')

wall_info_file = '/Users/chenxiaoxiong/Workspace/ImmersiveOffice/public/assets/hm3f_wall_info.json'
wall_objs = list(filter(lambda obj: re.match(r'wall\.[0-9]+', obj.name, re.I), C.visible_objects))
# 打开一个新文件或者清空现有文件以写入坐标
with open(wall_info_file, 'w') as f:
    f.write('[\n')
    # 遍历当前场景中所有选中的物体
    for i, obj in enumerate(wall_objs):
        # 获取物体的全局位置
        location = obj.location
        rotation_euler = obj.rotation_euler
        print(obj.rotation_axis_angle[0], obj.rotation_axis_angle[1],obj.rotation_axis_angle[2],obj.rotation_axis_angle[3])
        f.write('{')
        f.write(f'"name": "{obj.name}",')
        f.write(f'"position": [{location.x},{location.y},{location.z}],')
        f.write(f'"rotation_euler": [{rotation_euler.x}, {rotation_euler.y}, {rotation_euler.z}]')
        f.write('}')
        if i == len(wall_objs) - 1:
            f.write("\n")
        else:
            f.write(",\n")
    f.write(']')