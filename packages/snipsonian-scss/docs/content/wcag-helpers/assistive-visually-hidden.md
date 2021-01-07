# Assistive & visually hidden

Hide content from assistive technologies and visually.
Makes use of the `aria-hidden="true"` property to hide for assistive services.

|  |  |
| ---: | --- |
| **use-name:** | `%snip-assistive-visually-hidden`, `.snip-assistive-visually-hidden` |
| **type:** | wcag-helper |

```html
@code
<div>
    <p>Visible everywhere</p>
</div>

<div aria-hidden="true">
    <p>Screen readers scare me</p>
</div>

<div class="snip-assistive-visually-hidden" aria-hidden="true">
    <p>Screen readers and screens scare me</p>
</div>
```
