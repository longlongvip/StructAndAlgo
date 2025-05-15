# 点

## 点与点之间的距离

```cpp
template<typename T>
T distance(const Vector2<T>& p1, const Vector2<T>& p2)
{
    return len(p2 - p1);
}
```

## 点与点是否相同

```cpp
template<typename T>
bool same(const Vector2<T>& p1, const Vector2<T>& p2)
{
    if(is_zero(len(p1, p2)))
    {
        return true;
    }
    return false;
}

```

## 点到直线的距离

```cpp
template<typename T>
T distance(const Vector2<T>& p, const Line2<T>& line)
{

}

```

## 点与直线关系

```cpp
template<typename T>
Dir relation(const Vector2<T>& p, const Line2<T>& line)
{
    T v = cross(p, line.p)
    if(is_zero(v))
    {
        return Dir.On;
    }
    if(v < 0)
    {
        return Dir.Left;
    }
    return Dir.Right;
}
```

## 点与线段的关系

```cpp
template<typename T>
Dir relation(const Vector2<T>& p, const Segment2<T>& segment)
{
    bool bx = is_in(p.x, segment.p1.x, segment.p2.x);
    if(!bx)
    {
        return Dir.Out;
    }
    bool by = is_in(p.y, segment.p1.y, segment.p2.y);
    if(!by)
    {
        return Dir.Out;
    }

    T v = cross(p - segment.p1, segment.v);
    if(v == 0)
    {
        return Dir.On;
    }
    if(v < 0)
    {
        return Dir.Left;
    }
    return Dir.Right;
}
```

## 点与矩形的关系

```cpp
template<typename T>
Dir relation(const Vector2<T>& p, const Rect<T>& rect)
{
    bool bx = is_in(p.x, rect.left, rect.right);
    if(!bx)
    {
        return Dir.Out;
    }
    bool by = is_in(p.y, rect.top, rect.bottom);
    if(!by)
    {
        return Dir.Out;
    }
    return Dir.In;
}
```

## 点与三角形的关系

```cpp
template<typename T>
Dir relation(const Vector2<T>& p, const Triangle<T>& tri)
{
    return Dir.Out;
}
```

## 点与圆的关系

```cpp
template<typename T>
Dir relation(const Vector2<T>& p, const Circle<T>& circle)
{
    T v = len(p, circle.c);
    if(is_zero(v))
    {
        return Dir.On;
    }
    if(v < circle.r)
    {
        return Dir.In;
    }
    return Dir.Out;
}
```

## 点与椭圆的关系

```cpp
template<typename T>
Dir relation(const Vector2<T>& p, const Circle<T>& circle)
{
    T v = square(p.x) * square(circle.b) + square(p.y) * square(circle.a) - static_cast<T>(1);
    if(is_zero(v))
    {
        return Dir.On;
    }
    if(v < static_cast<T>(0))
    {
        return Dir.In;
    }
    return Dir.Out;
}
```

## 点与多边形的关系

```cpp
template<typename T>
Dir relation(const Vector2<T>& p, const Polygon<T>& poly)
{
    return Dir.Out;
}
```
