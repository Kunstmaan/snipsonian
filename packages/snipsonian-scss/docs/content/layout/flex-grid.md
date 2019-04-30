# Flex Grid

Generate a flexbox grid with one line, the selector on which it's called is the flex wrapper, it's direct children serve as cols.

|  |  |
| ---: | --- |
| **use-name:** | `snip-flex-grid` |
| **type:** | mixin |
| **arguments:** | <ol><li>`$gutter`<br/>default: `0` (int, pixel value)</li><li>`$cols`<br>default: `0`</li></ol> |

When using `null` as $cols argument (default value), the cols/elements won't wrap.

```html
@example

<div class="ss-flex-grid-container">
    <code>$cols not set</code>
    <div class="ss-flex-grid-1">
        <div>Col 1</div>
        <div>Col 2</div>
        <div>Col 3</div>
        <div>Col 4</div>
        <div>Col 5</div>
    </div>
</div>

<div class="ss-flex-grid-container">
    <code>$cols = 3</code>
    <div class="ss-flex-grid-2">
        <div>Col 1</div>
        <div>Col 2</div>
        <div>Col 3</div>
        <div>Col 4</div>
        <div>Col 5</div>
    </div>
</div>
```
