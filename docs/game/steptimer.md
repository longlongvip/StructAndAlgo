# StepTimer

StepTimer 类如何被用来在游戏或应用程序中管理时间，通过在每一帧渲染前调用 Tick 方法，并执行一个回调函数来进行时间相关的更新

```cpp
#pragma once

// 用于动画和模拟计时的辅助类
class StepTimer
{
public:
    StepTimer() :
        m_elapsedTicks(0),
        m_totalTicks(0),
        m_leftOverTicks(0),
        m_frameCount(0),
        m_framesPerSecond(0),
        m_framesThisSecond(0),
        m_qpcSecondCounter(0),
        m_isFixedTimeStep(false),
        m_targetElapsedTicks(TicksPerSecond / 60)
    {
        QueryPerformanceFrequency(&m_qpcFrequency);
        QueryPerformanceCounter(&m_qpcLastTime);

        // Initialize max delta to 1/10 of a second.
        m_qpcMaxDelta = m_qpcFrequency.QuadPart / 10;
    }

    // Get elapsed time since the previous Update call.
    UINT64 GetElapsedTicks() const                        { return m_elapsedTicks; }
    double GetElapsedSeconds() const                    { return TicksToSeconds(m_elapsedTicks); }

    // Get total time since the start of the program.
    UINT64 GetTotalTicks() const                        { return m_totalTicks; }
    double GetTotalSeconds() const                        { return TicksToSeconds(m_totalTicks); }

    // Get total number of updates since start of the program.
    UINT32 GetFrameCount() const                        { return m_frameCount; }

    // Get the current framerate.
    UINT32 GetFramesPerSecond() const                    { return m_framesPerSecond; }

    // Set whether to use fixed or variable timestep mode.
    void SetFixedTimeStep(bool isFixedTimestep)            { m_isFixedTimeStep = isFixedTimestep; }

    // Set how often to call Update when in fixed timestep mode.
    void SetTargetElapsedTicks(UINT64 targetElapsed)    { m_targetElapsedTicks = targetElapsed; }
    void SetTargetElapsedSeconds(double targetElapsed)    { m_targetElapsedTicks = SecondsToTicks(targetElapsed); }

    // Integer format represents time using 10,000,000 ticks per second.
    static const UINT64 TicksPerSecond = 10000000;

    static double TicksToSeconds(UINT64 ticks)            { return static_cast<double>(ticks) / TicksPerSecond; }
    static UINT64 SecondsToTicks(double seconds)        { return static_cast<UINT64>(seconds * TicksPerSecond); }

    // After an intentional timing discontinuity (for instance a blocking IO operation)
    // call this to avoid having the fixed timestep logic attempt a set of catch-up 
    // Update calls.

    void ResetElapsedTime()
    {
        QueryPerformanceCounter(&m_qpcLastTime);

        m_leftOverTicks = 0;
        m_framesPerSecond = 0;
        m_framesThisSecond = 0;
        m_qpcSecondCounter = 0;
    }

    typedef void(*LPUPDATEFUNC) (void);

    // Update timer state, calling the specified Update function the appropriate number of times.
    void Tick(LPUPDATEFUNC update = nullptr)
    {
        // Query the current time.
        LARGE_INTEGER currentTime;

        QueryPerformanceCounter(&currentTime);

        UINT64 timeDelta = currentTime.QuadPart - m_qpcLastTime.QuadPart;

        m_qpcLastTime = currentTime;
        m_qpcSecondCounter += timeDelta;

        // Clamp excessively large time deltas (e.g. after paused in the debugger).
        if (timeDelta > m_qpcMaxDelta)
        {
            timeDelta = m_qpcMaxDelta;
        }

        // Convert QPC units into a canonical tick format. This cannot overflow due to the previous clamp.
        timeDelta *= TicksPerSecond;
        timeDelta /= m_qpcFrequency.QuadPart;

        UINT32 lastFrameCount = m_frameCount;

        if (m_isFixedTimeStep)
        {
            // Fixed timestep update logic

            // If the app is running very close to the target elapsed time (within 1/4 of a millisecond) just clamp
            // the clock to exactly match the target value. This prevents tiny and irrelevant errors
            // from accumulating over time. Without this clamping, a game that requested a 60 fps
            // fixed update, running with vsync enabled on a 59.94 NTSC display, would eventually
            // accumulate enough tiny errors that it would drop a frame. It is better to just round 
            // small deviations down to zero to leave things running smoothly.

            if (abs(static_cast<int>(timeDelta - m_targetElapsedTicks)) < TicksPerSecond / 4000)
            {
                timeDelta = m_targetElapsedTicks;
            }

            m_leftOverTicks += timeDelta;

            while (m_leftOverTicks >= m_targetElapsedTicks)
            {
                m_elapsedTicks = m_targetElapsedTicks;
                m_totalTicks += m_targetElapsedTicks;
                m_leftOverTicks -= m_targetElapsedTicks;
                m_frameCount++;

                if (update)
                {
                    update();
                }
            }
        }
        else
        {
            // Variable timestep update logic.
            m_elapsedTicks = timeDelta;
            m_totalTicks += timeDelta;
            m_leftOverTicks = 0;
            m_frameCount++;

            if (update)
            {
                update();
            }
        }

        // Track the current framerate.
        if (m_frameCount != lastFrameCount)
        {
            m_framesThisSecond++;
        }

        if (m_qpcSecondCounter >= static_cast<UINT64>(m_qpcFrequency.QuadPart))
        {
            m_framesPerSecond = m_framesThisSecond;
            m_framesThisSecond = 0;
            m_qpcSecondCounter %= m_qpcFrequency.QuadPart;
        }
    }

private:
    // Source timing data uses QPC units.
    LARGE_INTEGER m_qpcFrequency;
    LARGE_INTEGER m_qpcLastTime;
    UINT64 m_qpcMaxDelta;

    // Derived timing data uses a canonical tick format.
    UINT64 m_elapsedTicks;
    UINT64 m_totalTicks;
    UINT64 m_leftOverTicks;

    // Members for tracking the framerate.
    UINT32 m_frameCount;
    UINT32 m_framesPerSecond;
    UINT32 m_framesThisSecond;
    UINT64 m_qpcSecondCounter;

    // Members for configuring fixed timestep mode.
    bool m_isFixedTimeStep;
    UINT64 m_targetElapsedTicks;
};
```

## 使用

```cpp
#include "StepTimer.h"

StepTimer s_timer;

void update(const StepTimer& timer)
{
    float dt = timer.GetElapsedSeconds();
    // 更新游戏
}

void render()
{
    // 渲染游戏
}

void tick()
{
    s_timer.Tick([&]()
    { 
        update(s_timer); 
    });
    render();
}
```

## Variable-step mode

默认情况下，StepTimer类会在每一帧调用一次传给Tick方法的回调函数，并且这个回调函数可以向StepTimer类查询自上次更新以来经过的时间长度

> StepTimer（一个计时器）会采取一些预防措施，以确保时间差（delta time）永远不会是负数，也不会太大（默认的最大值是1/10秒），因为太大的时间差可能会导致巨大的跳跃，这可能会干扰调试或挂起行为

## Fixed-step mode

StepTimer 类可以被设置为固定步长模式，如下所示

```cpp
s_timer.SetFixedTimeStep(true);
s_timer.SetTargetElapsedSeconds(1.f / 60.f);
```

在这种模式下，Tick将根据需要多次调用回调，以“赶上”预期的固定更新时间。然后，回调可以依赖于稳定（和固定）的持续时间，这可以增加物理和其他模拟处理的稳健性

固定步长可以通过使用SetTargetElapsedTicks或SetTargetElapsedSeconds来设置。请注意，StepTimer将刻度定义为每秒10,000,000次

如果预期的延迟比平时大，代码应该调用ResetElapsedTime以避免固定步骤Tick大量调用update方法来“追赶”

> 整体循环时间受到标准渲染循环使用的Present帧率的限制。否则，您可以在StepTimer自己的线程上以仅受系统计时器分辨率限制的速率“勾选”它的实例

CoreApplication::ResumingCoreApplication::Resuming处理程序应该调用ResetElapsedTime

刻度存储在无符号的64位整数中，第二个值存储在double中
