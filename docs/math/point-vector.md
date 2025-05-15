# 点与向量

## 笛卡尔坐标系统 2D

```cpp
class Point
{
    double m_x, m_y;

public:
    void operator + (const Vector &V);
    void operator - (const Vector &V);
    void rotate(const Point &P, const float &f);
        
    Point operator + (const Point &P, const Vector &V);
    Point operator - (const Point &P, const Vector &V);
    Point rotate(const Point &P, const float &f);
    
    float dis(const Point &A, const Point &B);
    Vector operator - (const Point &A, const Point &B);
}

class Vector
{
    double m_x, m_y;

public:
    // void move(const float &x, const float &y);
    void operator + (const Vector &A);
    void operator - (const Vector &A);
    float operator * (const Vector &A);
    float operator ^ (const Vector &A);
    float len(const Vector &A);
    float len2(const Vector &A);
    float angle(const Vector &A);
    void rotate(const Vector &A, const float &f);
        
    Vector operator + (const Vector &A, const Vector &B);
    Vector operator - (const Vector &A, const Vector &B);
    Vector operator * (const Vector &A, const float &f);
    float operator * (const Vector &A, const Vector &B);
    float operator ^ (const Vector &A, const Vector &B);
    float angle(const Vector &A, const Vector &B);
    Vector rotate(const Vector &A, const float &f);
}
```
