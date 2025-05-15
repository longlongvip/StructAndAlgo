# 数学分析

## 交换两个数

```cpp
template<typename T>
void swap(T& lhs, T& rhs)
{
    T tmp = lhs;
    lhs = rhs;
    rhs = tmp;
}
```

## 快速幂

```cpp
template<typename T>
T fast_pow(T a, int n)
{
    T t = 1;
    while(n > 0)
    {
        if(n & 1)
        {
            t *= a;
        }
        a *= a;
        n >> 1;
    }
    return t;
}

template<typename T>
T fast_pow(T a, int n, int m)
{
    a %= m;
    T t = 1;
    while(n > 0)
    {
        if(n & 1)
        {
            t *= a;
            t %= m;
        }
        a *= a;
        a %= m;
        n >> 1;
    }
    return t;
}
```

## 矩阵快速幂
