# 链表

## 非侵入式链表——单向链表

```c
struct SListNode
{
    void* value;
    SListNode* next;
};

#define SListHead SListNode
```

```cpp
#include <forward_list> // 单项链表
```

## 非侵入式链表——双向链表

```c
struct ListNode
{
    void* value;
    SListNode* prev;
    SListNode* next;
};

#define ListHead SListNode
```

```cpp
#include <list> // 双项链表
```

## 侵入式链表——单向链表

```c
struct SListNode
{
    SListNode* next;
};

#define SListHead SListNode
```

```cpp
template<typename T>
struct SListNode
{
    SListNode* next;
    
};
```

## 侵入式链表——双向链表

```c
struct ListNode
{
    ListNode* prev;
    ListNode* next;
};

#define ListHead ListNode
```

```cpp
template<typename T>
struct ListNode
{
    ListNode* prev;
    ListNode* next;
};

```
