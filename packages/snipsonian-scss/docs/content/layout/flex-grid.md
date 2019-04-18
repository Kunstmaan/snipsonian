# Flex Grid

Generate a flexbox grid with one line, the selector on which it's called is the flex wrapper, it's direct children serve as cols.

|  |  |
| ---: | --- |
| **use-name:** | `snip-flex-grid` |
| **type:** | mixin |
| **arguments:** | `$gutter`<br>default: `0` (int, pixel value) <br>`$cols`<br>default: 4.  |

```html
@example
<div class="ss-flex-grid">
    <div>Col 1</div>
    <div>Col 2</div>
</div>
```
