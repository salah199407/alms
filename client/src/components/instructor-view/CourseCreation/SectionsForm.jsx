"use client"

import { useState } from "react";
import { useCourseCreation } from "@/context/course-context/CourseCreationContext";
import { contentTypes } from "@/config";
import { PlusIcon, XMarkIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";

// Initialisation du parseur Markdown
const mdParser = new MarkdownIt();

const SectionsForm = () => {
  const { state, dispatch, saveCourse, uploadMedia } = useCourseCreation();
  const { modules, activeModule } = state;
  const [uploadProgress, setUploadProgress] = useState({});
  const [isUploading, setIsUploading] = useState({});
  const [activeSectionId, setActiveSectionId] = useState("");

  const activeModuleData = modules.find((m) => m.id === activeModule) || modules[0];

  const handleModuleChange = (e) => {
    dispatch({ type: "SET_ACTIVE_MODULE", payload: e.target.value });
  };

  const addSection = () => {
    dispatch({ type: "ADD_SECTION", payload: activeModule });
  };

  const removeSection = (sectionId) => {
    if (activeModuleData.sections.length <= 1) {
      alert("You must have at least one section per module");
      return;
    }
    dispatch({
      type: "REMOVE_SECTION",
      payload: { moduleId: activeModule, sectionId },
    });
  };

  const updateSection = (sectionId, field, value) => {
    dispatch({
      type: "UPDATE_SECTION",
      payload: { moduleId: activeModule, sectionId, field, value },
    });
  };

  const updateSectionType = (sectionId, type) => {
    dispatch({
      type: "UPDATE_SECTION_TYPE",
      payload: { moduleId: activeModule, sectionId, type },
    });
  };

  const handleMediaUpload = async (sectionId, file, mediaType) => {
    if (!file) return;

    setIsUploading((prev) => ({ ...prev, [sectionId]: true }));
    setUploadProgress((prev) => ({ ...prev, [sectionId]: 0 }));

    try {
      const result = await uploadMedia(file, (progress) => {
        setUploadProgress((prev) => ({ ...prev, [sectionId]: progress }));
      });

      if (result.success) {
        if (mediaType === "video") {
          updateSection(sectionId, "videoUrl", result.url);
          updateSection(sectionId, "public_id", result.public_id);
        } else if (mediaType === "image") {
          updateSection(sectionId, "imageUrl", result.url);
          updateSection(sectionId, "public_id", result.public_id);
        }
      }
    } finally {
      setIsUploading((prev) => ({ ...prev, [sectionId]: false }));
    }
  };

  const handleNext = () => {
    // Valider que chaque section a un titre et du contenu
    const hasInvalidSections = activeModuleData.sections.some(
      section => !section.title || 
              (section.type === "text" && !section.content) ||
              (section.type === "video" && (!section.videoUrl || !section.content)) ||
              (section.type === "image" && (!section.imageUrl || !section.content))
    );
    
    if (hasInvalidSections) {
      alert("Please fill all required fields for each section before proceeding");
      return;
    }
    
    // Sauvegarder le cours avant de passer à l'onglet suivant
    saveCourse().then(result => {
      if (result) {
        // Passer à l'onglet suivant
        const tabButton = document.querySelector('[data-tab="4"]');
        if (tabButton) tabButton.click();
      }
    });
  };

  const handleEditorChange = ({ text }, sectionId) => {
    updateSection(sectionId, "content", text);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Module Sections</h2>
        <p className="text-gray-600 mt-1">
          Add content sections to each module. Sections can contain text, videos, or images.
        </p>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <label htmlFor="module-select" className="block text-sm font-medium text-gray-700">
            Select Module
          </label>
          <select
            id="module-select"
            value={activeModule}
            onChange={handleModuleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          >
            {modules.map((module) => (
              <option key={module.id} value={module.id}>
                {module.title || `Module ${module.id.split("-")[1]}`}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">{activeModuleData?.title || "Module Content"}</h3>
          <p className="text-gray-600 mb-4">{activeModuleData?.description}</p>
        </div>

        <div className="space-y-6">
          {activeModuleData?.sections.map((section, index) => (
            <div
              key={section.id}
              className={`border rounded-lg overflow-hidden ${
                activeSectionId === section.id ? "border-orange-500 shadow-md" : "border-gray-200"
              }`}
            >
              <div
                className={`p-4 flex justify-between items-center cursor-pointer ${
                  activeSectionId === section.id ? "bg-orange-50" : "bg-gray-50"
                }`}
                onClick={() => setActiveSectionId(activeSectionId === section.id ? "" : section.id)}
              >
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 mr-3">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">{section.title || `Section ${index + 1}`}</h3>
                </div>
                <div className="flex items-center">
                  {activeModuleData.sections.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSection(section.id);
                      }}
                      className="ml-2 text-gray-400 hover:text-red-500"
                      aria-label="Remove section"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveSectionId(activeSectionId === section.id ? "" : section.id);
                    }}
                    className="ml-2 text-gray-400 hover:text-gray-500"
                  >
                    <svg
                      className={`h-5 w-5 transform transition-transform ${
                        activeSectionId === section.id ? "rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {activeSectionId === section.id && (
                <div className="p-4 border-t border-gray-200">
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor={`section-title-${section.id}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Section Title *
                      </label>
                      <input
                        type="text"
                        id={`section-title-${section.id}`}
                        value={section.title}
                        onChange={(e) => updateSection(section.id, "title", e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                        placeholder="e.g., Introduction to HTML"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Content Type</label>
                      <div className="grid grid-cols-3 gap-2">
                        {contentTypes.slice(0, 3).map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            className={`flex items-center justify-center py-2 px-3 rounded-md ${
                              section.type === type.id
                                ? "bg-orange-500 text-white"
                                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                            }`}
                            onClick={() => updateSectionType(section.id, type.id)}
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {section.type === "text" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Text Content *
                        </label>
                        <div className="border rounded-md overflow-hidden">
                          <MdEditor
                            value={section.content}
                            style={{ height: "300px" }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={(data) => handleEditorChange(data, section.id)}
                            config={{
                              view: {
                                menu: true,
                                md: true,
                                html: false,
                              },
                              table: {
                                maxRow: 5,
                                maxCol: 6,
                              },
                              imageUrl: "https://octodev.odc.ong/upload",
                            }}
                          />
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Use the toolbar above to format your text. The content is saved in Markdown format.
                        </p>
                      </div>
                    )}

                    {section.type === "video" && (
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor={`video-upload-${section.id}`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Upload Video *
                          </label>
                          <input
                            type="file"
                            id={`video-upload-${section.id}`}
                            accept="video/*"
                            onChange={(e) => handleMediaUpload(section.id, e.target.files[0], "video")}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                            disabled={isUploading[section.id]}
                          />
                          {isUploading[section.id] && (
                            <div className="mt-2">
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-orange-500 h-2.5 rounded-full"
                                  style={{ width: `${uploadProgress[section.id]}%` }}
                                ></div>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">Uploading: {uploadProgress[section.id]}%</p>
                            </div>
                          )}
                          {section.videoUrl && (
                            <div className="mt-2">
                              <p className="text-sm text-green-600 mb-1">Video uploaded successfully!</p>
                              <video
                                src={section.videoUrl}
                                controls
                                className="w-full h-auto rounded-md border border-gray-300"
                                style={{ maxHeight: "200px" }}
                              />
                            </div>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor={`video-description-${section.id}`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Video Description *
                          </label>
                          <textarea
                            id={`video-description-${section.id}`}
                            value={section.content}
                            onChange={(e) => updateSection(section.id, "content", e.target.value)}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                            placeholder="Describe what this video covers..."
                            required
                          />
                        </div>
                      </div>
                    )}

                    {section.type === "image" && (
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor={`image-upload-${section.id}`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Upload Image *
                          </label>
                          <input
                            type="file"
                            id={`image-upload-${section.id}`}
                            accept="image/*"
                            onChange={(e) => handleMediaUpload(section.id, e.target.files[0], "image")}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                            disabled={isUploading[section.id]}
                          />
                          {isUploading[section.id] && (
                            <div className="mt-2">
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-orange-500 h-2.5 rounded-full"
                                  style={{ width: `${uploadProgress[section.id]}%` }}
                                ></div>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">Uploading: {uploadProgress[section.id]}%</p>
                            </div>
                          )}
                          {section.imageUrl && (
                            <div className="mt-2">
                              <p className="text-sm text-green-600 mb-1">Image uploaded successfully!</p>
                              <img
                                src={section.imageUrl || "/placeholder.svg"}
                                alt={section.title}
                                className="w-full h-auto rounded-md border border-gray-300"
                                style={{ maxHeight: "200px" }}
                              />
                            </div>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor={`image-caption-${section.id}`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Image Caption *
                          </label>
                          <textarea
                            id={`image-caption-${section.id}`}
                            value={section.content}
                            onChange={(e) => updateSection(section.id, "content", e.target.value)}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                            placeholder="Add a caption for this image..."
                            required
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`free-preview-${section.id}`}
                        checked={section.freePreview}
                        onChange={(e) => updateSection(section.id, "freePreview", e.target.checked)}
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`free-preview-${section.id}`} className="ml-2 block text-sm text-gray-700">
                        Make available as free preview
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addSection}
            className="w-full py-3 border-2 border-dashed border-orange-300 rounded-lg text-orange-500 hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center justify-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Another Section
          </button>
        </div>

        <div className="mt-8 pt-5 border-t border-gray-200">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              className="ml-3 inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Next
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionsForm;