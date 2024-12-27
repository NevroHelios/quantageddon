# Mathematics & Statistics Books

## Foundation Texts
1. [Stochastic Calculus for Finance I & II](https://link.springer.com/book/10.1007/978-0-387-22527-2) by Steven Shreve
2. [Options, Futures, and Other Derivatives](https://www.pearson.com/en-us/subject-catalog/p/options-futures-and-other-derivatives/P200000006417) by John Hull

## Advanced Topics
### Example of stochastic process simulation
```python
import numpy as np
def geometric_brownian_motion(S0, mu, sigma, T, N):
    dt = T/N
    t = np.linspace(0, T, N)
    W = np.random.standard_normal(size = N)
    W = np.cumsum(W)*np.sqrt(dt)
    return S0 * np.exp((mu - 0.5 * sigma**2)*t + sigma*W)
```

### Online Courses
Visit our [Learning Portal](https://quantlearning.com) for interactive courses.