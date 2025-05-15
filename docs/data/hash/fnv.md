# FNV Hash

Fowler–Noll–Vo（简称FNV）是一种由Glenn Fowler、Landon Curt Noll和Kiem-Phong Vo共同创建的非加密哈希函数

作者：Glenn Fowler、Landon Curt Noll 和 Kiem-Phong Vo
文档：https://datatracker.ietf.org/doc/html/draft-eastlake-fnv-17.html
源码：

## FNV 偏移基数

存在多个不同的 FNV 偏移基数，用于不同位数的长度。这些偏移基数是通过计算以下 32 个八位字节（octets）的 FNV-0 得到的，当这些八位字节以 ASCII 码表示为：

```cpp
chongo <Landon Curt Noll> /\../\
```

这是兰登·科特·诺尔的签名行之一。这是已弃用的 FNV-0 目前唯一的实际用途

## FNV 素数

FNV 素数按照以下方式确定：

- 给一个整数 s， $ 4 < s < 11 $，让 $ n = 2^s $，$ t = \frac{5 + n}{12} $

```py
n = 32, t = 3
n = 64, t = 5
n = 128, t = 11
n = 256, t = 21
n = 512, t = 43
n = 1024, t = 85
```

- `n-bit` 的 FNV 素数是 $ p = 2^{8t} + 2^8 + b $ 的最小素数
    其中：
    - $ 0 < b < 2^8 $
    - 在二进制表示中，变量 $b$ 的 1 的个数要么是 4，要么是 5
    - $ p \mod (2^{40} - 2^{24} - 1) > 2^{24} + 2^8 + 7 $
    - 

```cpp

```

## FNV Hash 参数

## FNV 0

```cpp
T fnv0(T data)
{
    T hash = 0;
    for(auto c : data)
    {
        hash = hash * fnv_prime;
        hash = xor(hash, c);
    }
}
```

## FNV 1

```cpp
T fnv1(T data)
{
    T hash = fnv_offset_basis;
    for(auto c : data)
    {
        hash = hash * fnv_prime;
        hash = xor(hash, c);
    }
}
```

## FNV 1a

```cpp
T fnv1a(T data)
{
    T hash = 0;
    for(auto c : data)
    {
        hash = xor(hash, c);
        hash = hash * fnv_prime;
    }
}
```
