# 线段

## 线段与线段的关系

```cpp
template<typename T>
Dir relation(const Segment2<T>& lhs, const Segment2<T>& rhs)
{

    return cross(lhs.v, rhs.v) == 0?
        (lhs.v == rhs.v?
            (lhs.p1 == rhs.p1?
                ON :
                PARALLEL) :
            INVALID) :
        (cross(lhs.v, rhs.p1 - lhs.p1) == 0?
            ON :
            INVALID);
}
```
