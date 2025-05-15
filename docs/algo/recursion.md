# 递归

递归被定义的函数在它自己的定义中应用，但它通常不会出现无限循环

## 例子

- ![Img](Digui1.jfif)
- GNU：Gun is Not Unix
- 斐波那契数列

```cpp
template<typename T>
T fibonacci(T n)
{
    if (n < 2)
    {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}
```

- 汉诺塔

解法的基本思想是递归。假设有 A、B、C 三个塔，A 塔有 N 块盘，目标是把这些盘全部移到 C 塔。那么先把 A 塔顶部的 N − 1 块盘移动到 B 塔，再把 A 塔剩下的大盘移到 C，最后把 B 塔的 N − 1 块盘移到 C

```cpp
template<typename T>
void hanoi(T n, char from, char to, char aux)
{
    if(n == 1)
    {
        std::cout << "Move disk 1 from " << from << " to " << to << std::endl;
    }
    else
    {
        hanoi(n - 1, from, aux, to);
        std::cout << "Move disk " << n << " from " << from << " to " << to << std::endl;
        hanoi(n - 1, aux, to, from);
    }
}
```

- 阶乘

```cpp
template<typename T>
T factorial(T n)
{
    if (n == 0)
    {
        return 1;
    }
    return n * factorial(n - 1);
}
```

- Sierpinski 三角形
- 幽默的例子：要理解递归，你必须理解递归

## 递归到循环
