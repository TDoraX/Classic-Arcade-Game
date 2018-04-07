
前端纳米学位街机游戏克隆项目
===============================

## 运行游戏

在文件夹内找到 `index.html` 文件，直接双击运行即可。

> **建议使用Chrome或Safari浏览器以获得最佳体验，低版本Internet Explorer浏览器可能无法正常运行此游戏。**

### **游戏介绍**

打开游戏后，您可以看到游戏画面以及计分板，游戏地形有“河流”、“石板”、“草地”，其中“草地”是安全的，没有敌人存在，在游戏草地下方的小人是您需要控制的角色，而在“石板”上不断移动的虫子则是您的敌人。

### **游戏目标**

您需要控制小人到最上方河流处以获得加分，每到达一次河流时，分数+1并重置小人的初始位置。注意：在向上移动的同时，您也需要躲开敌人，避免与敌人发生碰撞。碰撞会导致小人被迫返回初始位置，且分数-1。

分数不设上限，可以无限次累加，最低得分为0分，若当前分数为0分，那么即使碰撞到敌人也不会再减少。**注意：分数不能保存，刷新浏览器页面会导致分数清零**

### **如何控制**

使用键盘方向键“↑”、“↓”、“←”、“→”来控制小人的移动方向。注意：若达到地图边缘，则不能继续向该方向移动