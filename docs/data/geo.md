# 几何数据结构

## 方向

```cpp
enum Dir
{
    On;
    In;
    Out;
    Left;
    Right;
    Up;
    Down;
    Front;
    Back;
    Sep;
    Tan;
    Cross;
};
```

## 点

```cpp
template<typename T>
using Point2 = Vector2<T>;
using Point3 = Vector3<T>;
```

## 直线

```cpp
template<typename T>
struct Line2
{
    using Point2 = Vector2<T>;
    Point2 p;
    Vector2<T> v;
};
```

## 射线

```cpp
template<typename T>
struct Line2
{
    using Point2 = Vector2<T>;
    Point2 p;
    Vector2<T> v;
};
```

## 线段

```cpp
template<typename T>
struct Segment2
{
    using Point2 = Vector2<T>;
    Point2 p1;
    Point2 p2;
    Vector2<T> v;
};

template<typename T>
struct Segment3
{
    using Point3 = Vector3<T>;
    Point3 p1;
    Point3 p2;
};
```

## 角

```cpp
template<typename T>
struct Angle
{
    T v;
};
```

## 面

## 矩形

```cpp
template<typename T>
struct Rect
{
    T left;
    T top;
    T right;
    T bottom;
};
```

## 圆

```cpp
template<typename T>
struct Circle
{
    using Point2 = Vector2<T>;
    Point2 c;
    T r;
};
```

## 弧

## 扇

## 弓

## 椭圆

```cpp
template<typename T>
struct Circle
{
    using Point2 = Vector2<T>;
    Point2 c;
    T a;
    T b;
};
```

## 抛物线

## 三角形

```cpp
template<typename T>
struct Triangle
{
    using Point2 = Vector2<T>;
    Point2 p1;
    Point2 p2;
    Point2 p3;
};
```

## 多边形

```cpp
template<typename T>
struct Polygon
{
    using Point2 = Vector2<T>;
    std::vector<Point2> ps;
};
```

## 凸包

```cpp
template<typename T>
struct Polygon
{
    using Point2 = Vector2<T>;
    std::vector<Point2> ps;
};
```

## 球

```cpp
template<typename T>
struct Sphere
{
    using Point3 = Vector3<T>;
    Point3 c;
    T r;
};
```

## 立方体

```cpp
template<typename T>
struct Cube
{
    using Point3 = Vector3<T>;
    Point3 c;
    T l;
    T w;
    T h;
};
```

## 圆柱

```cpp
template<typename T>
struct Cylinder
{
    using Point3 = Vector3<T>;
    Point3 c1;
    Point3 c2;
    T r;
};
```

## 圆锥

```cpp
template<typename T>
struct Cone
{
    using Point3 = Vector3<T>;
    Point3 c1;
    Point3 c2;
    T r;
};
```

## 胶囊体

```cpp
template<typename T>
struct Capsule
{
    using Point3 = Vector3<T>;
    Point3 c1;
    Point3 c2;
    T r;
    T h;
};
```
