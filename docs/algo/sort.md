# 排序

排序算法（英语：Sort Algorithm）是一种将一组特定的数据按某种顺序进行排列的算法。排序算法多种多样，性质也大多不同

## 性质

- 稳定性：稳定性是指相等的元素经过排序之后相对顺序是否发生了改变。拥有稳定性这一特性的算法会让原本有相等键值的纪录维持相对次序，即如果一个排序算法是稳定的，当有两个相等键值的纪录 R 和 S，且在原本的列表中 R 出现在 S 之前，在排序过的列表中 R 也将会是在 S 之前
- 时间复杂度：一般而言，好的性能是 $ O(nlogn) $，坏的性能是 $ O(n^2) $。对于一个排序理想的性能是 $ O(n) $
- 空间复杂度：

## 实际使用

## 归类

引入公共的头文件：`#include <utility>` 用于交换两个元素

## 选择排序 - Selection Sort

- 稳定性：不稳定
- 最快：$ O(n^2) $
- 平均：$ O(n^2) $
- 最慢：$ O(n^2) $

```cpp
template<typename T>
void selection_sort(T* arr, int n)
{
    for (int i = 1; i < n; ++i) 
    {
        int ith = i;
        for (int j = i + 1; j <= n; ++j)
        {
            if (arr[j] < arr[ith])
            {
                ith = j;
            }
        }
        std::swap(arr[i], arr[ith]);
    }
}
```

## 冒泡排序 - Bubble Sort

- 稳定性：稳定
- 最快：$ O(n) $
- 平均：$ O(n^2) $
- 最慢：$ O(n^2) $

```cpp
template<typename T>
void bubble_sort(T* arr, int n)
{
    bool b = true;
    while(b)
    {
        b = false;
        for (int i = 1; i < n; ++i)
        {
            if (arr[i] > arr[i + 1])
            {
                b = true;
                std::swap(arr[i], arr[i + 1]);
            }
        }
    }
}
```

## 插入排序 - Insert Sort

- 稳定性：稳定
- 最快：$ O(n) $
- 平均：$ O(n^2) $
- 最慢：$ O(n^2) $

```cpp
template<typename T>
void insertion_sort(T* arr, int n)
{
    for (int i = 1; i < n; ++i)
    {
        T key = arr[i];
        T j = i - 1;
        while (j >= 0 && arr[j] > key)
        {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}
```

## 归并排序 - Merge Sort

- 稳定性：稳定
- 最快：$ O(n log(n)) $
- 平均：$ O(n log(n)) $
- 最慢：$ O(n log(n)) $

```cpp

```

## 鸽巢排序 - Pigeonhole Sort

- 稳定性：不稳定
- 最快：$ O(n log(n)) $
- 平均：$ O(n log(n)) $
- 最慢：$ O(n log(n)) $

```cpp

```

## 基数排序 - Radix Sort

- 稳定性：不稳定
- 最快：$ O(k \dot n) $
- 平均：$ O(k \dot n) $
- 最慢：$ O(k \dot n) $

```cpp

```

## 计数排序 - Counting Sort

- 稳定性：不稳定
- 最快：$ O(k + n) $
- 平均：$ O(k + n) $
- 最慢：$ O(k + n) $

```cpp

```

## 桶排序 - Bucket Sort

- 稳定性：不稳定
- 最快：$ O(n) $
- 平均：$ O(n) $
- 最慢：$ O(n) $

```cpp

```

## Bogo Sort

- 稳定性：不稳定
- 最快：$ O() $
- 平均：$ O(n \times n!) $
- 最慢：$ O(\infty) $

```cpp

```

## 臭皮匠排序 - Stooge Sort

https://zh.wikipedia.org/wiki/%E8%87%AD%E7%9A%AE%E5%8C%A0%E6%8E%92%E5%BA%8F

- 稳定性：不稳定
- 最快：$ O() $
- 平均：$ O(n \times n!) $
- 最慢：$ O(\infty) $

```cpp

```
