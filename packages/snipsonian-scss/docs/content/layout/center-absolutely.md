# Center Absolutely

Center an absolutely positioned element horizontally, vertically, or both ways.

|  |  |
| ---: | --- |
| **use-name:** | `snip-center-absolutely` |
| **type:** | mixin, with extension placeholder(s) |
| **arguments:** | <ol><li>`$axis`<br/>default: `false`<br/>Leave `false` to center on both axes; or set to `x` or `y` to center on one axis only.</li></ol>|

Be warned: This method uses `position: absolute`, so the parent within which you'll be centering must have a `position` value other than `static`.

```html
@example
<div class="ss-center-absolutely-container">
    <div class="ss-center-absolutely ss-center-absolutely-1">Center default</div>
</div>

<div class="ss-center-absolutely-container">
    <div class="ss-center-absolutely ss-center-absolutely-2">Horizontal only</div>
</div>

<div class="ss-center-absolutely-container">
    <div class="ss-center-absolutely ss-center-absolutely-3">Vertical only</div>
</div>
```
