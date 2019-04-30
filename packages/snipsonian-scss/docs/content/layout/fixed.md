# Fixed

Fix an element's position and assign its coordinates, all in one line of SCSS.

|  |  |
| ---: | --- |
| **use-name:** | `snip-fixed` |
| **type:** | mixin, with default-values placeholder |
| **arguments:** | <ol><li>`$coordinates`<br/>default: `0 n n 0`<br/><br/>See information about [snip-coords](#coordinates).</li></ol> |

Notice the example in the bottom right.

```html
@example
<div>See the bottom right</div>
<div class="ss-fixed"><a href="#fixed">Here's your fixed example.</a></div>
```

    @code
        <div class="ss-fixed">Here's your fixed example.</div>
