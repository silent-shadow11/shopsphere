import { useEffect, useRef, useState } from 'react'

function AddProduct() {
  const [images, setImages] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [imageError, setImageError] = useState('')
  const imagePreviewsRef = useRef([])

  function clearImagePreviews() {
    imagePreviewsRef.current.forEach((url) => URL.revokeObjectURL(url))
    imagePreviewsRef.current = []
  }

  useEffect(() => clearImagePreviews, [])

  function handleSubmit(event) {
    event.preventDefault()
  }

  function handleImagesChange(event) {
    const selectedImages = Array.from(event.target.files)

    if (selectedImages.length > 5) {
      clearImagePreviews()
      setImages([])
      setImagePreviews([])
      setImageError('Please select no more than 5 images.')
      event.target.value = ''
      return
    }

    clearImagePreviews()
    const previews = selectedImages.map((image) => URL.createObjectURL(image))
    imagePreviewsRef.current = previews
    setImages(selectedImages)
    setImagePreviews(previews)
    setImageError('')
  }

  function handleReset() {
    clearImagePreviews()
    setImages([])
    setImagePreviews([])
    setImageError('')
  }

  const inputClassName = 'mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/10'
  const labelClassName = 'text-sm font-medium text-stone-700'

  return (
    <section id="admin-products" className="bg-[#f7f6f2] px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-5xl border border-stone-200 bg-white p-6 sm:p-10">
        <div className="border-b border-stone-200 pb-6">
          <p className="text-xs font-semibold tracking-[0.2em] text-emerald-800">PRODUCT CATALOG</p>
          <h2 className="mt-2 text-3xl font-medium tracking-tight text-stone-900">Add a product</h2>
          <p className="mt-2 text-sm text-stone-500">Add product details to prepare a new item for your store.</p>
        </div>

        <form className="mt-7 space-y-6" onSubmit={handleSubmit} onReset={handleReset}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="product-name" className={labelClassName}>Product name</label>
              <input id="product-name" name="name" type="text" placeholder="e.g. Everyday leather tote" required className={inputClassName} />
            </div>
            <div>
              <label htmlFor="product-category" className={labelClassName}>Category</label>
              <select id="product-category" name="category" defaultValue="" required className={inputClassName}>
                <option value="" disabled>Select a category</option>
                <option value="clothing">Clothing</option>
                <option value="home">Home &amp; living</option>
                <option value="accessories">Accessories</option>
                <option value="footwear">Footwear</option>
              </select>
            </div>
            <div>
              <label htmlFor="product-price" className={labelClassName}>Price</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-stone-400">$</span>
                <input id="product-price" name="price" type="number" min="0" step="0.01" placeholder="0.00" required className={`${inputClassName} pl-8`} />
              </div>
            </div>
            <div>
              <label htmlFor="product-stock" className={labelClassName}>Stock quantity</label>
              <input id="product-stock" name="stock" type="number" min="0" step="1" placeholder="0" required className={inputClassName} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="product-images" className={labelClassName}>Product images</label>
              <input
                id="product-images"
                name="images"
                type="file"
                accept="image/*"
                multiple
                required
                onChange={handleImagesChange}
                aria-describedby="product-images-help"
                className={`${inputClassName} file:mr-4 file:rounded-full file:border-0 file:bg-emerald-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-emerald-900 hover:file:bg-emerald-100`}
              />
              <p id="product-images-help" className="mt-2 text-xs text-stone-500">Upload up to 5 images.</p>
              {images.length > 0 && (
                <p className="mt-1 text-xs text-emerald-800">{images.length} image{images.length === 1 ? '' : 's'} selected.</p>
              )}
              {imageError && <p role="alert" className="mt-1 text-xs text-red-600">{imageError}</p>}
              {imagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {imagePreviews.map((preview, index) => (
                    <div key={preview} className="overflow-hidden rounded-xl border border-stone-200 bg-stone-50">
                      <img src={preview} alt={`Product preview ${index + 1}`} className="aspect-square w-full object-cover" />
                      <p className="truncate px-2 py-1.5 text-xs text-stone-600">{images[index].name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="product-description" className={labelClassName}>Description</label>
              <textarea id="product-description" name="description" rows="5" placeholder="Describe the product, its materials, and what makes it special..." required className={`${inputClassName} resize-y`} />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-stone-200 pt-5 sm:flex-row sm:justify-end">
            <button type="reset" className="rounded-full border border-stone-300 px-5 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-50">Clear form</button>
            <button type="submit" className="rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:ring-offset-2">Save product</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default AddProduct
