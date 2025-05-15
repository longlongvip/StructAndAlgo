# 随机

随机算法（randomized algorithm），是一种算法，在算法中使用了随机函数，且随机函数的返回值直接或者间接的影响了算法的执行流程或执行结果。就是将算法的某一步或某几步置于运气的控制之下，即该算法在运行的过程中的某一步或某几步涉及一个随机决策，或者说其中的一个决策依赖于某种随机事件

## 拉斯维加斯算法

拉斯维加斯算法（Las Vegas algorithm）是一种永远给出正确解的随机算法

## 蒙特卡罗方法

蒙特卡罗方法（英语：Monte Carlo method），也称统计模拟方法。20世纪40年代，科学家冯·诺伊曼、斯塔尼斯拉夫·乌拉姆和尼古拉斯·梅特罗波利斯于洛斯阿拉莫斯国家实验室为核武器计划工作时，发明了蒙特卡罗方法，因为乌拉姆的叔叔经常在摩纳哥的蒙特卡洛赌场输钱得名，而蒙特卡罗方法正是以概率为基础的方法

### 演示

- Pi 的计算

```cpp

```

## 洗牌算法

```cpp
template<typename T>
void FisherYatesShuffle(T* arr, int n)
{
    for (int i = n - 1; i > 0; i--)
    {
        int j = Random.Range(0, i + 1);
        std::swap(arr[i], arr[j]);
    }
}
```

洗牌算法是指将一组有序的元素重新进行排列顺序的算法，通常用于生成随机排列。洗牌算法常见的应用包括：

- 生成游戏规则：在很多棋牌游戏中，需要随机打乱卡牌或棋子的顺序，以确保游戏的公平性
- 加密和安全：在密码学中，洗牌算法可用于加密密钥的生成，以增加密码的强度
- 随机抽样：在统计学和模拟领域，常常需要从一个总体中随机选取样本进行研究和分析

洗牌算法的实现通常采用随机交换元素的方式，即对于每个元素，随机选择一个位置与其交换。

```cpp
template <typename T>
void shuffle(std::vector<T>&totals)
{
    std::random_device rd; // 随机数种子
    std::mt19937 gen(rd()); // 随机数生成器
    std::uniform_int_distribution<> dis(0, totals.size() - 1); // 均匀分布
    int k = totals.size();
    for (int i = k - 1; i > 0; i--)
    {
        int r = dis(gen); // 生成一个 [0, i] 之间的整数}
        std::swap(totals[i], totals[r]); // 将第 r 个元素与第 i 个元素交换}
    }
}
```

## 蓄水池算法

假设工厂有一批产品需要在生产完成时马上决定这批产品是否符合交付要求，但是由于时间紧迫，无法等所有产品 都生产完成后再进行抽样质检。此时，工厂领导提出了以下要求：

- 被刚生产的产品 马上进行检测
- 取出 K 个样品的质量结果报送
- 所有产品被报送的概率是均等

蓄水池抽样算法对于第 k 个待抽取样本做如下操作：

当前已经决定是否要抽取的样本数量 n 增加1

- 当 n <= k 时，直接将第 k 个样本放入蓄水池中
- 当 n > k 时，随机生成一个 [0, n] 之间的整数 r，若 r < k，则将第 r 个样本从蓄水池中替换

因为蓄水池抽样是流式算法，所以使用数学归纳法证明比较清晰：

假设：

- 参与抽样的总体数量为 N
- 要抽取的样本数量为 K
- n 表示 第 n 个样本
- k 表示前 n 个样本中的任意一个

```cpp

template <typename T>
void reservoir_sampling(const std::vector<T>&totals, int n, std::vector<T>&reservoir)
{
    std::random_device rd; // 随机数种子
    std::mt19937 gen(rd()); // 随机数生成器
    std::uniform_int_distribution<> dis(0, n); // 均匀分布
    int k = reservoir.size();
    for (int i = 0; i < k; i++)    
    {
        reservoir[i] = totals[i];
    }

    for (int i = k; i < n; i++)
    {
        int r = dis(gen); // 生成一个 [0, i] 之间的整数
        if (r < k)
        {
            reservoir[r] = totals[i]; // 将第 r 个样本从蓄水池中替换
        }
    }
}
```

## 蓄水池算法的改进

在我们通常遇到的抽奖场景，在年会时将所有人的编号都放到箱子里面抽奖，然后每次抽出中奖者 决定奖项。而在这过程中，因为先抽中者已经确定了奖项，然后不能够参与后续的奖项的抽奖；而后 续参与抽奖的人员则其实会以越来越低的概率参与抽奖:

假设在上述场景中共有 $n$ 个参与抽取 $m$ 个奖项，则

- 抽取第一个奖的概率为 $\frac{m}{n}$
- 抽取第二个奖的概率为 $\frac{m-1}{n-1}$
- 抽取第三个奖的概率为 $\frac{m-2}{n-2}$
- ...
- 抽取第 $k$ 个奖的概率为 $\frac{m-k+1}{n-k+1}$

由于
$$
\frac{m}{n} > \frac{m-1}{n-1} > \frac{m-2}{n-2} > ... > \frac{m-k+1}{n-k+1}
$$

前面的奖项被拿走了，后面抽到奖项的概率会更低, 能抽到的奖品也会更少

我们需要设计算法使得每个奖项被抽到的概率是相同的

- 当人数比奖品数少的时候：

因为当人数不足时，所有参与者都能抽奖，因此我们要保证每个人获得特定奖项的概率为 $\frac{1}{m}$

- 当人数比奖品数多的时候：

当人数大于奖品数时，我们需要保证每个参与者获得特定奖项的概率为 $\frac{m}{n}$

## 分红包

```cpp
public static double getRandomMoney(RedPackage _redPackage)
{
    // remainSize 剩余的红包数量
    // remainMoney 剩余的钱
    if (_redPackage.remainSize == 1) {
        _redPackage.remainSize--;
        return (double) Math.round(_redPackage.remainMoney * 100) / 100;
    }
    Random r     = new Random();
    double min   = 0.01; //
    double max   = _redPackage.remainMoney / _redPackage.remainSize * 2;
    double money = r.nextDouble() * max;
    money = money <= min ? 0.01: money;
    money = Math.floor(money * 100) / 100;
    _redPackage.remainSize--;
    _redPackage.remainMoney -= money;
    return money;
}
```
