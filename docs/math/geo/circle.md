# 圆

## 圆与圆的距离

```cpp
template<typename T>
T distance(const Circle2<T>& lhs, const Circle2<T>& rhs)
{
    return distance(lhs.c - rhs.c);
}
```

## 圆与圆的关系

```cpp
template<typename T>
Dir relation(const Circle2<T>& lhs, const Circle2<T>& rhs)
{
    T d = (a.c - b.c).norm();
}
```
