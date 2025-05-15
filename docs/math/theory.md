# 数论

## 二进制表示中 1 的个数

```cpp
template<typename T>
T count_1(T n)
{
    T count = 0;

    while(n!= 0)
    {
        count++;
        n &= (n - 1);
    }
    return count;
}
```

## 最大公约数

```cpp
template<typename T>
T gcd(T a, T b)
{
    T t = 1;
    while(t != 0)
    {
        t = a%b;
        a = b;
        b = t;
    }
    return a;
}

```

## 最小公倍数

```cpp
template<typename T>
T lcm(T a, T b)
{
    T t = gcd(a, b);
    return a / t * b;
}
```

## 扩展欧几里得

```cpp
template<typename T>
T exgcd(T a, T b, T& x, T& y)
{
    T x1 = 1, x2 = 0, x3 = 1, x4 = 1;
    while(b != 0)
    {
        T c = a / b;
        std::tie(x1, x2, x3, x4, a, b) = std::make_tuple(x3, x4, x1 - x3 * c, x2 - x4 * c, b, a - b * c);
    }
    x = x1;
    y = x2;
    return a;
}

```

## Stein gcd

```cpp
template<typename T>
T stein_gcd(T a, T b)
{
    T acc = 0;
    while((a & 1) == 0 && (b & 1) == 0)
    {
        acc++;
        a >>= 1;
        b >>= 1;
    }

    while((a & 1) == 0)
    {
        a >>= 1;
    }

    while((b & 1) == 0)
    {
        b >>= 1;
    }

    if(a < b)
    {
        std::swap(a, b);
    }

    while((a = (a - b) >> 1) != 0)
    {
        while((a & 1) == 0)
        {
            a >>= 1;
        }
        if(a < b)
        {
            std::swap(a, b);
        }
    }
    return b << acc;
}
```

## 线性筛

## 欧拉函数

## 欧拉定理

## 费马小定理

## 中国剩余定理

## 莫比乌斯

## 同余方程

## 约数

## 约数个数

## 约数之和
