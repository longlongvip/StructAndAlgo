# 光

## 光的传播 2D

## 光的反射 2D

```cpp
Vector2D Reflect(const Vector2D &IL, Vector2D &N)
{
    return IL - 2 * (IL * N) * N;
}
```

## 光的折射 2D

```cpp
Vector2D Refract(const Vector2D &IL, Vector2D &N, const float &ior)
{
    ior = 1.0 / ior;
    double dsini = single(IL, N);
    double dsinr = ior * dsini;
    double dcosr = sqrt(1 - ior * ior * dsini);
    return -dcosr * N + ior * (IL - (IL * N) * N)
}
```

## 光的全反射 2D

```cpp
Vector2D FullReflect(const Vector2D &IL, Vector2D &N, const float &ior)
{
    ior = 1.0 / ior;
    double dsini = single(IL, N);
    double dsinr = ior * dsini;
    double dcosr = sqrt(1 - ior * ior * dsini);
    return -dcosr * N + ior * (IL - (IL * N) * N)
}
```
