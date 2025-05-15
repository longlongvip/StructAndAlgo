# 直线

## 直线与直线的关系

```cpp
template<typename T>
Dir relation(const Line2<T>& lhs, const Line2<T>& rhs)
{
    
    return cross(lhs.v, rhs.v) == 0 ?
        (lhs.v == rhs.v ?
            (lhs.p == rhs.p ?
                ON :
                PARALLEL) :
            INVALID) :
        (cross(lhs.v, rhs.p - lhs.p) == 0 ?
            ON :
            INVALID);
}
```
