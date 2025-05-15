# 素数

素数（或质数）是一个大于 1 的自然数，它不是两个较小自然数的乘积

## 简单算法

```cpp
template<typename T>
bool is_prime(T x)
{
    if(x < 2)
    {
        return false;
    }
    if(x < 4)
    {
        return true;
    }
    if（x % 2 == 0）
    {
        return false;
    }

    for(T i = 2; i < x; i++)
    {
        if(x % i == 0)
        {
            return false;
        }
    }
    return true;
}
```

## 平方加速

```cpp
template<typename T>
bool is_prime(T x)
{
    if(x < 2)
    {
        return false;
    }
    if(x < 4)
    {
        return true;
    }
    if（x % 2 == 0）
    {
        return false;
    }
    for(T i = 2; i * i <= x; i++)
    {
        if(x % i == 0)
        {
            return false;
        }
    }
    return true;
}
```

## 10000 内的质数

```cpp
std::unordered_map<int, bool> Primes = {
    
}; // 1229 个素数

// https://zh.wikipedia.org/wiki/%E7%B4%A0%E6%95%B0%E8%AE%A1%E6%95%B0%E5%87%BD%E6%95%B0
// 如果 n > 10000，素数个数不超过 n/10

```
