"use client"

import { useState } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"

export const TagInput = ({ tags, setTags, placeholder = "Add a tag..." }) => {
  const [input, setInput] = useState("")

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault()
      if (!tags.includes(input.trim())) {
        setTags([...tags, input.trim()])
      }
      setInput("")
    }
  }

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-orange-500 focus-within:border-orange-500">
      {tags.map((tag, index) => (
        <div key={index} className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-800 rounded-md">
          <span className="text-sm">{tag}</span>
          <button type="button" onClick={() => removeTag(index)} className="text-orange-600 hover:text-orange-800">
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      ))}
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="flex-1 min-w-[120px] outline-none border-none bg-transparent"
        placeholder={tags.length === 0 ? placeholder : ""}
      />
    </div>
  )
}
