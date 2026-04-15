import * as echarts from 'echarts'

const architectureTheme = {
  color: ['#B8423A', '#C9A961', '#4A6B6B', '#6B4423', '#8C2E28', '#4A4A4A', '#D66B5A', '#E0C98A'],
  backgroundColor: 'transparent',
  animation: true,
  animationThreshold: 8,
  animationDuration: 1000,
  animationEasing: 'cubicOut',
  animationDelay: 0,
  animationDurationUpdate: 500,
  animationEasingUpdate: 'cubicInOut',
  animationDelayUpdate: 0,
  textStyle: {
    fontFamily: 'Noto Sans SC, sans-serif',
    color: '#4A4A4A'
  },
  title: {
    textStyle: {
      fontFamily: 'Noto Serif SC, serif',
      color: '#2C2C2C',
      fontWeight: 600,
      fontSize: 16
    },
    subtextStyle: {
      fontFamily: 'Noto Sans SC, sans-serif',
      color: '#808080',
      fontSize: 12
    }
  },
  legend: {
    textStyle: {
      fontFamily: 'Noto Sans SC, sans-serif',
      color: '#4A4A4A',
      fontSize: 12
    },
    pageTextStyle: {
      color: '#4A4A4A'
    }
  },
  categoryAxis: {
    axisLine: {
      lineStyle: {
        color: '#E0DCD0'
      }
    },
    axisLabel: {
      color: '#4A4A4A',
      fontFamily: 'Noto Sans SC, sans-serif'
    },
    axisTick: {
      lineStyle: {
        color: '#E0DCD0'
      }
    },
    splitLine: {
      lineStyle: {
        color: '#E0DCD0',
        type: 'dashed'
      }
    }
  },
  valueAxis: {
    axisLine: {
      lineStyle: {
        color: '#E0DCD0'
      }
    },
    axisLabel: {
      color: '#4A4A4A',
      fontFamily: 'Noto Sans SC, sans-serif'
    },
    axisTick: {
      lineStyle: {
        color: '#E0DCD0'
      }
    },
    splitLine: {
      lineStyle: {
        color: '#E0DCD0',
        type: 'dashed'
      }
    }
  },
  logAxis: {
    axisLine: {
      lineStyle: {
        color: '#E0DCD0'
      }
    },
    axisLabel: {
      color: '#4A4A4A'
    },
    splitLine: {
      lineStyle: {
        color: '#E0DCD0',
        type: 'dashed'
      }
    }
  },
  timeAxis: {
    axisLine: {
      lineStyle: {
        color: '#E0DCD0'
      }
    },
    axisLabel: {
      color: '#4A4A4A'
    },
    splitLine: {
      lineStyle: {
        color: '#E0DCD0',
        type: 'dashed'
      }
    }
  },
  tooltip: {
    backgroundColor: 'rgba(44, 44, 44, 0.9)',
    borderColor: '#B8423A',
    borderWidth: 1,
    textStyle: {
      color: '#F5F2E9',
      fontFamily: 'Noto Sans SC, sans-serif'
    }
  },
  line: {
    smooth: true,
    symbol: 'circle',
    symbolSize: 6,
    lineStyle: {
      width: 2
    }
  },
  bar: {
    itemStyle: {
      borderRadius: [4, 4, 0, 0]
    }
  },
  pie: {
    itemStyle: {
      borderRadius: 4,
      borderColor: '#F5F2E9',
      borderWidth: 2
    }
  },
  radar: {
    axisLine: {
      lineStyle: {
        color: '#E0DCD0'
      }
    },
    splitLine: {
      lineStyle: {
        color: '#E0DCD0'
      }
    },
    splitArea: {
      areaStyle: {
        color: ['rgba(197, 61, 67, 0.02)', 'rgba(212, 175, 55, 0.02)']
      }
    }
  },
  map: {
    itemStyle: {
      areaColor: '#F5F2E9',
      borderColor: '#E0DCD0',
      borderWidth: 1
    },
    emphasis: {
      itemStyle: {
        areaColor: '#E8D4A8'
      },
      label: {
        show: true,
        color: '#2C2C2C'
      }
    }
  },
  toolbox: {
    iconStyle: {
      borderColor: '#4A4A4A'
    },
    emphasis: {
      iconStyle: {
        borderColor: '#B8423A'
      }
    }
  },
  dataZoom: {
    backgroundColor: 'rgba(245, 242, 233, 0.8)',
    dataBackgroundColor: 'rgba(197, 61, 67, 0.2)',
    fillerColor: 'rgba(197, 61, 67, 0.1)',
    handleColor: '#B8423A',
    handleSize: '80%',
    textStyle: {
      color: '#4A4A4A'
    }
  }
}

export const registerTheme = () => {
  echarts.registerTheme('architecture', architectureTheme)
}

export const chartColors = {
  primary: '#B8423A',
  secondary: '#C9A961',
  accent: '#4A6B6B',
  brown: '#6B4423',
  dark: '#8C2E28',
  gray: '#4A4A4A'
}

export const gradientColors = {
  red: ['#B8423A', '#D66B5A', '#F5B5B8'],
  gold: ['#C9A961', '#E0C98A', '#F5EDC8'],
  ink: ['#2C2C2C', '#5A5A5A', '#8A8A8A'],
  teal: ['#4A6B6B', '#4A8A8A', '#7ABABA']
}

export const animationConfig = {
  fadeIn: {
    animationDuration: 1000,
    animationEasing: 'cubicOut'
  },
  slideIn: {
    animationDuration: 800,
    animationEasing: 'elasticOut'
  },
  scaleIn: {
    animationDuration: 600,
    animationEasing: 'backOut'
  },
  waveIn: {
    animationDuration: 1200,
    animationEasing: 'sinusoidalOut'
  }
}

export const getAnimationDelay = (index, total) => {
  return (index / total) * 500
}

export const createSeriesAnimation = (type = 'fadeIn') => {
  const configs = {
    fadeIn: {
      animationDuration: 1000,
      animationEasing: 'cubicOut',
      animationDelay: (idx) => idx * 100
    },
    slideUp: {
      animationDuration: 800,
      animationEasing: 'elasticOut',
      animationDelay: (idx) => idx * 50
    },
    scaleIn: {
      animationDuration: 600,
      animationEasing: 'backOut',
      animationDelay: (idx) => idx * 80
    },
    waveIn: {
      animationDuration: 1200,
      animationEasing: 'sinusoidalOut',
      animationDelay: (idx) => idx * 30
    }
  }
  return configs[type] || configs.fadeIn
}

export default architectureTheme
