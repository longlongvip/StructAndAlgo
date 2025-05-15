# 圆

```cpp
class Circle
{
    public:
        float xc, yc, r;

        void Set(float x, float y);

}

Circle::Set(float x, float y)
{
    xc = x;
    yc = y;
}

Circle::Move(float x, float y)
{
    xc += x;
    yc += y;
}
```