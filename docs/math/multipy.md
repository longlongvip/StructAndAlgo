# 乘法

乘法算法是计算两个数值相乘乘积的算法。为了提高运算效率，不同大小的数字适用不同的乘法算法。自十进制数字系统诞生以来，就已开始发展乘法算法。

## 网格法

将两个乘数分解为百位、十位和个位的部分，然后在相对简单的乘法步骤中直接算出这些部分的乘积，再将其一一相加以算出最终结果。用这种方法计算$76 \times 54$可以画出如下网格：

|  | 70 | 6 |
| - | - | - |
| 50 | 3500 | 300 |
| 4 | 280 | 24 |

$76 \times 54 = 3500 + 300 + 280 + 54 = 4104$

## 长乘法

世界各地的学校都会教学生使用这种算法完成日常的乘法计算。其内容是：将一个乘数乘以另一个乘数的每位数字，然后将所有数字按照适当的位置相加得出结果。这需要预先记住所有个位数字两两相乘后的结果，即华人世界常见的乘法表。长乘法又被称为教科书乘法或标准乘法

<div align=center><img width=100% height=100% src=99Table.png/></div>

代码实现：

```python
def multiply(self, num1: str, num2: str) -> str:
    if num1 == "0" or num2 == "0":
        return "0"
    
    m, n = len(num1), len(num2)
    ansArr = [0] * (m + n)
    for i in range(m - 1, -1, -1):
        x = int(num1[i])
        for j in range(n - 1, -1, -1):
            ansArr[i + j + 1] += x * int(num2[j])
        
    for i in range(m + n - 1, 0, -1):
        ansArr[i - 1] += ansArr[i] // 10
        ansArr[i] %= 10
        
    index = 1 if ansArr[0] == 0 else 0
    ans = "".join(str(x) for x in ansArr[index:])
    return ans
```

## 移位和相加

位运算是很快的，所以计算10x可以使用下面的方法：

```python
((x << 2 + x)) << 1 # 计算10x
(x << 3) + (x << 1) # 计算10x
```

## 平方的四分之一乘法

平方的四分之一乘法的原理是
$$
  \frac{(x+y)^{2}}{4} - \frac{(x-y)^{2}}{4} = xy
$$

## Karatsuba算法

卡拉楚巴算法主要是用于两个大数的乘法，极大提高了运算效率，相较于普通乘法降低了复杂度，并在其中运用了递归的思想。基本的原理和做法是将位数很多的两个大数$x$和$y$分成位数较少的数，每个数都是原来$x$和$y$位数的一半。这样处理之后，简化为做三次乘法，并附带少量的加法操作和移位操作。

代码实现：

```python
def karatsuba(num1, num2):
    num1Str, num2Str = str(num1), str(num2)

    if num1Str[0] == '-': return -karatsuba(-num1, num2)
    if num2Str[0] == '-': return -karatsuba(num1, -num2)

    if num1 < 10 or num2 < 10: return num1 * num2
    
    maxLength = max(len(num1Str), len(num2Str))
    num1Str = ''.join(list('0' * maxLength)[:-len(num1Str)] + list(num1Str))
    num2Str = ''.join(list('0' * maxLength)[:-len(num2Str)] + list(num2Str))
    
    splitPosition = maxLength // 2
    high1, low1 = int(num1Str[:-splitPosition]), int(num1Str[-splitPosition:])
    high2, low2 = int(num2Str[:-splitPosition]), int(num2Str[-splitPosition:])
    z0, z2 = karatsuba(low1, low2), karatsuba(high1, high2)
    z1 = karatsuba((low1 + high1), (low2 + high2))
    return z2 * 10 ** (2 * splitPosition) + (z1 - z2 - z0) * 10 ** (splitPosition) + z0
```

## 傅里叶算法
