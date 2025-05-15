# Boyer-Moore 字符串搜索

在计算机科学中，Boyer-Moore字符串搜索算法是一种高效的字符串搜索算法，是实用字符串搜索文献的标准基准。它由Robert S. Boyer和J Strother Moore于1977年开发。[2]原始论文包含用于计算模式偏移的静态表格，但没有解释如何生成它们。生成表格的算法发表在后续论文中；这篇论文包含后来由Wojciech Rytter在1980年纠正的错误

算法预处理正在搜索的字符串（模式），但不预处理正在搜索的字符串（文本）。因此，它非常适合模式比文本短得多或在多次搜索中持续存在的应用程序。Boyer-Moore算法使用在预处理步骤中收集的信息来跳过文本的某些部分，从而比许多其他字符串搜索算法产生更低的常数因子。一般来说，随着模式长度的增加，算法运行得更快。该算法的关键特征是在模式的尾部而不是头部进行匹配，并且在多个字符的跳转中跳过文本，而不是搜索文本中的每个字符

## 算法

T - 要搜索的文本
P - 被搜索的文本
n - 文本长度
m - 被搜索的文本长度
S[i] - 表示字符串S索引i处的字符，从1开始计数
S[i, j] - S[i… j]表示字符串S的子字符串，从索引i开始，到j结束
S的前缀是[1, l]范围内某个i的子字符串S[1, i]，其中l是S的长度
S的后缀是[1, l]范围内的某个i的子字符串S[i, l]，其中l是S的长度
P到T的对齐是T中的索引k，使得P的最后一个字符与T的索引k对齐
如果P等价于T[（k-m+1）… k]，则P的匹配或出现发生在对齐k处。

## 预处理

- 计算坏字符表

    - 坏字符：T 中 与 P 不匹配的字符
    - 计算坏字符数组
    ```cpp
        void bm_bc(const char* pattern, int m, int* bc) {
            for (int i = 0; i < 256; ++i) {
                bc[i] = m; 
            }
            for (int i = 0; i < m - 1; ++i) {
                bc[pattern[i]] = m - i - 1; 
            }
        }
    ```
   
- 计算好后缀表
    
    - 好后缀：T 中 与 P 匹配的后缀
    - 计算好后缀数组
    ```cpp
        void suffix(const char *pattern, int m, int *suff, bool *prefix) 
        {
            int k = m - 1 - j;
            if(suff[k] != -1)
            {
                return j - suff[k] + 1;
            }
            for(int r = j + 2; r <= m - 1; ++r)
            {
                if(prefix[m - r])
                {
                    return r;
                }
            }
            return m;
        }

        void bm_gs(const char* pattern, int m, int* gs, bool *prefix)
        {
            for (int i = 0; i < m - 1; ++i) 
            {
                int j = i;
                int k = 0; // 公共后缀子串长度
                while (j >= 0 && pattern[j] == pattern[m - 1 - k]) 
                {
                    --j;
                    ++k;
                    gs[k] = j + 1; // j+1表示公共后缀子串在pattern中的起始下标
                }
                if (j == -1)
                {
                    prefix[k] = true; // 如果公共后缀子串也是模式串的前缀子串
                }
            }
        }
    ```

- 实现 Boyer-Moore 算法
    ```cpp
    int bm_search(const char* text, int n, const char* pattern, int m)
    {
        int i = j = 0;
        int bc[256]; // 坏字符哈希表
        int suffix[256]; // 好后缀规则的后缀数组
        bool prefix[256]; // 好后缀规则的前缀数组
        bm_bc(pattern, m, bc); // 构建坏字符哈希表
        bm_gs(pattern, m, suffix, prefix); // 构建好后缀规则的后缀数组和前缀数组
        
        while (i <= n - m) {
            for(j = m - 1; j >= 0; --j)
             {
                // 模式串从后往前匹配
                if (text[i+j] != pattern[j])
                {
                    break; // 坏字符对应模式串中的下标是j
                }
            }
    
            if (j < 0)
            {
                return i; // 匹配成功，返回主串与模式串第一个相同字符的位置 
            }
    
            int x = j - bc[(int)text[i+j]]; // 坏字符规则
            int y = 0; // 好后缀规则
            if (j < m - 1) // 如果有好后缀的话
            {
                y = bm_gs(j, m, suffix, prefix); // 计算好后缀规则
            }
            i = i + max(x, y); // 取坏字符规则和好后缀规则的最大值作为移动步长
        }
        return -1; // 匹配失败，返回-1
    }
    ```

## 性能

原始论文中提出的Boyer-Moore算法的最坏情况运行时间为O（n * m）,条件是只有当模式没有出现在文本中时，当模式确实出现在文本中时，原始算法的运行时间为O(nm)
