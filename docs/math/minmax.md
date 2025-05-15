# 比较

## 整型比较

```cpp
template<typename T>
bool equal(const T& lhs, const T& rhs)
{
    return lhs == rhs;
}
```

## 获取最大最小值——整数类型

```cpp
template<typename T>
T min(T x, T y)
{
    return std::min(x, y);
}

template<typename T>
T max(T x, T y)
{
    return std::max(x, y);
}

template<typename T>
T min(T x, T y, T z)
{
    return std::min(x, std::min(y, z));
}

template<typename T>
T max(T x, T y, T z)
{
    return std::max(x, std::max(y, z));
}

```

## 正、负与 0 的比较——整数类型

```cpp
template<typename T>
boo is_zero(T x)
{
    return x == static_cast<T>(0);
}

template<typename T>
bool is_positive(T x)
{
    return x > static_cast<T>(0);
}

template<typename T>
bool is_negative(T x)
{
    return x < static_cast<T>(0);
}
```

## 浮点数比较

```cpp
template<typename T>
bool fequal(T x, T y)
{
    return std::abs(x - y) <= std::numeric_limits<T>::epsilon();
}
```

## 获取最大最小值——浮点数类型

```cpp
template<typename T>
T fmin(T x, T y)
{
    if(fequal(x, y))
    {
        return x;
    }
    return std::min(x, y);
}

template<typename T>
T fmax(T x, T y)
{
    if(fequal(x, y))
    {
        return x;
    }
    return std::max(x, y);
}

template<typename T>
T fmin(T x, T y, T z)
{
    return fmin(fmin(x, y), z);
}

template<typename T>
T fmax(T x, T y, T z)
{
    return fmax(fmax(x, y), z);
}
```

## 正、负与 0 的比较——浮点数类型

```cpp
template<typename T>
bool is_fzero(T x)
{
    return fequal(x, static_cast<T>(0));
}

bool is_fone(T x)
{
    return fequal(x, static_cast<T>(1));
}

template<typename T>
bool is_fpositive(T x)
{
    if(is_fzero(x))
    {
        return false;
    }
    return x > static_cast<T>(0);
}

template<typename T>
bool is_fnegative(T x)
{
    if(is_fzero(x))
    {
        return false;
    }
    return x < static_cast<T>(0);
}
```

## 容忍误差的浮点数比较

```cpp
template<typename T>
bool fequal(T x, T y, T tol)
{
    return std::abs(lhs - rhs) <= tol;
}
```

## 获取最大最小值——容忍误差的浮点数类型

```cpp
template<typename T>
bool fmin(T x, T y, T tol)
{
    if(fequal(x, y, tol))
    {
        return x;
    }
    return std::min(x, y);
}

template<typename T>
bool fmax(T x, T y, T tol)
{
    if(fequal(x, y, tol))
    {
        return x;
    }
    return std::max(x, y);
}

template<typename T>
bool fmin(T x, T y, T z, T tol)
{
    return fmin(fmin(x, y, tol), z, tol);
}

template<typename T>
bool fmax(T x, T y, T z, T tol)
{
    return fmax(fmax(x, y, tol), z, tol);
}
```

## 正、负与 0 的比较——容忍误差的浮点数类型

```cpp
template<typename T>
bool is_fzero(T x, T tol)
{
    return fequal(x, static_cast<T>(0), tol);
}

bool is_fone(T x, T tol)
{
    return fequal(x, static_cast<T>(1), tol);
}

template<typename T>
bool is_fpositive(T x, T tol)
{
    if(is_fzero(x, tol))
    {
        return false;
    }
    return x > static_cast<T>(0);
}

template<typename T>
bool is_fnegative(T x, T tol)
{
    if(is_fzero(x, tol))
    {
        return false;
    }
    return x < static_cast<T>(0);
}
```
