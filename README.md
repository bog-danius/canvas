# canvas


## 25.03.2024

1. Добавить автоматическую перерисовку canvas. Иногда нам canvas нужно перерисовать пару раз в минуту. Для такого подхода
нет надобности в постоянном rendering. Когда проект большой с кучей условий - на помощь приходит другой подход:
Мы устанавливаем `setInterval` и render canvas 60 раз в секунду(1_000 / 60). При таком подходе мы отдельно работаем
с моделью данных(местоположением объектом), а рендеринг происходит параллельно.