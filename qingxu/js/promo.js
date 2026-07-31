(() => {
  const REMINDER_DELAY_MS = 40000
  let activeDialog = null
  let previousFocus = null

  function focusFirstControl(dialog) {
    const control = dialog.querySelector('button, a[href]')
    if (control) control.focus()
  }

  function closeDialog(dialog) {
    if (!dialog || dialog.hidden) return
    dialog.hidden = true
    document.body.classList.remove('promo-dialog-open')
    if (activeDialog === dialog) activeDialog = null
    if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus()
    previousFocus = null
  }

  function openDialog(dialog) {
    if (!dialog) return
    if (activeDialog && activeDialog !== dialog) activeDialog.hidden = true
    previousFocus = document.activeElement
    activeDialog = dialog
    dialog.hidden = false
    document.body.classList.add('promo-dialog-open')
    window.requestAnimationFrame(() => focusFirstControl(dialog))
  }

  function initPromoDialogs() {
    const testNotice = document.getElementById('testNoticeDialog')
    const supportReminder = document.getElementById('supportReminderDialog')
    if (!testNotice || !supportReminder) return

    document.addEventListener('click', (event) => {
      const closeTarget = event.target.closest('[data-promo-close]')
      if (!closeTarget) return
      closeDialog(document.getElementById(closeTarget.dataset.promoClose))
    })

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeDialog(activeDialog)
    })

    openDialog(testNotice)
    window.setTimeout(() => openDialog(supportReminder), REMINDER_DELAY_MS)
  }

  document.addEventListener('DOMContentLoaded', initPromoDialogs)
})()
