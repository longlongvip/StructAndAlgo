# 搜索

## 实际使用

```cpp

```

## 顺序搜索

时间复杂度：$ O(n) $

```cpp
template<typename T>
int linear_search(T* arr, T key, int n)
{
    if(arr == nullptr)
    {
        return -1;
    }
    for(i = 0; i <= n; i++)
    {
        if(arr[i] == key)
        {
            return i;
        }
    }
    return -1;
}
```

## 二分搜索

时间复杂度：$ O(log(n)) $

```cpp
template<typename T>
int binary_search(T* arr, T key, int n)
{
    if(arr == nullptr)
    {
        return -1;
    }
    int mid = 0;
    int left = 0; 
    int right = n - 1;
    while(left <= right)
    {
        mid = left + (right - left) / 2;
        if (arr[mid] < key)
        {
            left = mid + 1;
        }	
		else if (arr[mid] > key)
        {
            right = mid - 1;
        }
		else 
        {
			return mid;
        }
    }
    return -1;
}
```

## Map

```cpp

```
