# 数学

## 数

```cpp
template<typename T>
struct Num
{
    T value;
};

```

## 复数

```cpp
#include <complex>
```

## 分数

```cpp
template<typename T>
struct Rat
{
    /** T 是整型 */
    T m; // 分母
    T n; // 分子
}
```

## 二维向量

```cpp
template<typename T>
struct Vector2
{
    /** T 一般是浮点型 */
    T x;
    T y;
}
```

## 三维向量

```cpp
template<typename T>
struct Vector3
{
    /** T 一般是浮点型 */
    T x;
    T y;
    T z;
}
```

## 四维向量

```cpp
template<typename T>
struct Vector4
{
    /** T 一般是浮点型 */
    T x;
    T y;
    T z;
    T w;
}
```

## 直角坐标系

```cpp
template<typename T>
struct Cartesian
{
    /** T 一般是浮点型 */
    T x;
    T y;
}

```

## 极坐标系

```cpp
template<typename T>
struct Polar
{
    /** T 一般是浮点型 */
    T r;
    T theta;
}
```

## 柱标系

```cpp
template<typename T>
struct Cylindrical 
{
    /** T 一般是浮点型 */
    T r;
    T theta;
    T z;
}
```

## 球坐标系

```cpp
template<typename T>
struct Spherical
{
    /** T 一般是浮点型 */
    T r;
    T theta;
    T phi;
}
```

## 多项式

```cpp
template<typename T>

```

## float 16

```cpp
struct Float16
{
public:
    Float16(float f);
    operator float();

private:
    uint16_t v;
}
```

## float 11

```cpp
struct Float11
{
public:
    Float16(float f);
    operator float();

private:
    uint16_t v;
}
```

## float 10

```cpp
struct Float10
{
public:
    Float16(float f);
    operator float();

private:
    uint16_t v;
}
```
