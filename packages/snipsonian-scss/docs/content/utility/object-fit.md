# Object fit

Object-fit mixin, fallbacks for unsuported browsers are <strong>not</strong> provided.

|  |  |
| ---: | --- |
| **use-name:** | `snip-object-fit` |
| **type:** | mixin |
| **arguments:** | `$fit`<br/>can be set with one of the following: `fill`, `contain`, `cover`, `none`, `scale-down` <br/><br/>`$x-position`<br/>default: `center` <br/><br/>`$y-position`<br/>default: `center`  |
| **arguments:** | <ol><li>`$fit`<br/>default: `cover` <br/>can be set with one of the following: `fill`, `contain`, `cover`, `none`, `scale-down` </li><li>`$x-position`<br/>default: `center` </li><li>`$y-position`<br/>default: `center`</li></ol> |

```html
@example
<div class="snip-object-fit-wrapper">
    <div class="original-image snip-object-fit-item">
        <p>original image</p>
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/14179/image.png"> 
    </div>

    <div class="image snip-object-fit-item">
        <p>object-fit: fill</p>
        <img class="snip-object-fit-fill" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/14179/image.png">
    </div>

    <div class="image snip-object-fit-item">
        <p>object-fit: contain</p>
        <img class="snip-object-fit-contain" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/14179/image.png">
    </div>

    <div class="image snip-object-fit-item">
        <p>object-fit: contain & position: bottom right</p>
        <img class="snip-object-fit-contain-bottom-right" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/14179/image.png">
    </div>

    <div class="image snip-object-fit-item">
        <p>object-fit: cover</p>
        <img class="snip-object-fit-cover" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/14179/image.png">
    </div>

    <div class="image snip-object-fit-item">
        <p>object-fit: none</p>
        <img class="snip-object-fit-none" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/14179/image.png">
    </div>

    <div class="image snip-object-fit-item">
        <p>object-fit: scale-down</p>
        <img class="snip-object-fit-scaledown" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/14179/image.png">
    </div>
</div>
```

```html
@code
<div class="image snip-object-fit-item">
    <p>object-fit: fill</p>
    <img class="snip-object-fit-fill" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/14179/image.png">
</div>

<div class="image snip-object-fit-item">
    <p>object-fit: contain</p>
    <img class="snip-object-fit-contain" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/14179/image.png">
</div>

<div class="image snip-object-fit-item">
    <p>object-fit: cover</p>
    <img class="snip-object-fit-cover" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/14179/image.png">
</div>

<div class="image snip-object-fit-item">
    <p>object-fit: none</p>
    <img class="snip-object-fit-none" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/14179/image.png">
</div>

<div class="image snip-object-fit-item">
    <p>object-fit: scale-down</p>
    <img class="snip-object-fit-scaledown" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/14179/image.png">
</div>
```
