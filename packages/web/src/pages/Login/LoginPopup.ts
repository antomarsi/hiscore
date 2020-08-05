class PopupWindow {
  id: string
  url: string
  window: Window | null
  promise: Promise<any>
  _iid?: number

  constructor(id: string, url: string) {
    this.id = id
    this.url = url

    this.window = window.open(this.url, this.id, '?height=100&width=60')

    this.promise = new Promise((resolve, reject) => {
      this._iid = window.setInterval(() => {
        try {
          const popup = this.window
          console.log(popup)
          if (!popup || popup.closed !== false) {
            this.close()

            reject(new Error('The popup was closed'))

            return
          }
          if (
            popup.location.href === this.url ||
            popup.location.pathname === 'blank'
          ) {
            return
          }

          //const params = toParams(popup.location.search.replace(/^\?/, ''))

          resolve(true)

          this.close()
        } catch (error) {
          /*
           * Ignore DOMException: Blocked a frame with origin from accessing a
           * cross-origin frame.
           */
        }
      }, 500)
    })
  }

  close() {
    this.cancel()
    this.window!.close()
  }

  cancel() {
    if (this._iid) {
      window.clearInterval(this._iid)
      this._iid = undefined
    }
  }

  then(args: any) {
    return this.promise.then(args)
  }

  catch(args: any) {
    return this.promise.then(args)
  }

  static open(id: string, url: string) {
    const popup = new this(id, url)

    return popup
  }
}

export default PopupWindow
