# Visibility

Mixins to hide and show elements from certain breakpoints, note: overrides display property with the important flag.

|  |  |
| ---: | --- |
| **use-name:** | `snip-hide-from` && `snip-show-from` |
| **type:** | mixin |
| **arguments:** | <ol><li>`$breakpoint`<br/>default: `null`</li></ol> |


```html
@example
<div class="ss-hide-mobile-reverse">
    <p>Hidden as of breakpoint: 768px, visible before breakpoint.</p>
</div>
<div class="ss-hide-mobile">
    <p>Hidden as of breakpoint: 768px, visible before breakpoint.</p>
</div>
<div class="ss-show-mobile-reverse">
    <p>Visible as of breakpoint: 768px, hidden before breakpoint.</p>
</div>
<div class="ss-show-mobile">
    <p>Visible as of breakpoint: 768px, hidden before breakpoint.</p>
</div>
```

```html
@code
<div class="ss-hide-mobile">
    <p>Hidden as of breakpoint: 768px, visible before breakpoint.</p>
</div>

<div class="ss-show-mobile">
    <p>Visible as of breakpoint: 768px, hidden before breakpoint.</p>
</div>
```
