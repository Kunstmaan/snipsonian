# Fixed

Fix an element's position and assign its coordinates, all in one line of SCSS.

|  |  |
| ---: | --- |
| **use-name:** | `snip-fixed` |
| **type:** | mixin, with default-values placeholder |
| **arguments:** | `$coordinates`<br>default: `0 n n 0`<br>See information about [snip-coords](#coordinates).  |

Notice the example in the bottom right.

## Example


### HTML
```html
@example
<div>See the bottom right</div>
<div class="ss-fixed"><a href="#fixed">Here's your fixed example.</a></div>
```

    @code
        <div class="ss-fixed">Here's your fixed example.</div>
