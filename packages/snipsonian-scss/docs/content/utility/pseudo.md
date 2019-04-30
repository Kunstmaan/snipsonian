# Pseudo

Mixin to position pseudo elements

|  |  |
| ---: | --- |
| **use-name:** | `snip-pseudo` |
| **type:** | mixin |
| **arguments:** | <ol><li>`$display`<br/>default: `block`</li><li>`$position`<br/>default: `absolute`</li><li>`$content`<br/>default: `''`</li></ol> |

Be warned: This method uses `position: absolute` by default, so the parent within which you'll be centering must have a `position` value other than `static`.

```html
@example
<div class="snip-pseudo-wrapper snip-pseudo-wrapper-1">
    <p>Absolute position, no content</p>
</div>

<div class="snip-pseudo-wrapper snip-pseudo-wrapper-2">
    <p>Absolute position, content</p>
</div>
```
