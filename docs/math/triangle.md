# 三角形

```cpp
class Triangle
{
    public:
        float xa, ya;
        float xb, yb;
        float xc, yc;

        void Set(float x, float y);

}

Triangle::Set(float x, float y)
{
    xc = x;
    yc = y;
}

Triangle::Move(float x, float y)
{
    xa += x; xb += x; xc += x;
    ya += y; yb += y; yc += y;
}
```