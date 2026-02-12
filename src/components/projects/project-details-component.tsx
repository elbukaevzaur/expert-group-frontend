"use client";

import styles from "@/app/projects/[projectsCategoriesId]/details/[projectId]/details.module.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getProjectDetails } from "@/lib/http/projectsRequest";
import { ProjectsDetailsResponse } from "@/lib/models/projects";
import LoadingImage from "../loading/loading-image";
import { VectorSvg } from "@/lib/icon-svg";
import PaginationComponent from "../pagination/pagination";

interface Params {
  projectId: string;
}

export default function ProjectDetailsComponent(params: Params) {
  const [project, setProject] = useState<ProjectsDetailsResponse>(
    {} as ProjectsDetailsResponse,
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjectDetails(Number(params.projectId));
  }, [params.projectId]);

  function loadProjectDetails(projectId: number) {
    getProjectDetails(projectId).then((resp) => {
      setProject(resp.data);
    });
  }

  useEffect(() => {
    if (project?.defaultImage !== null && project?.defaultImage !== undefined) {
      // const index = project?.images?.map(m => m.imagePath).indexOf(project.defaultImage);
      // setSelectedImageIndex(index)
    } else if (project?.images !== null && project?.images !== undefined) {
      setSelectedImageIndex(0);
    }
  }, [project?.defaultImage]);

  const handleImageChange = (index: number) => {
    if (index !== selectedImageIndex) {
      setIsLoading(true);
      setSelectedImageIndex(index);
    }
  };

  function handleShowPrevImage() {
    if (selectedImageIndex > 0) {
      setIsLoading(true);
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  }

  function handleShowNextImage() {
    if (selectedImageIndex < project?.images.length - 1) {
      setIsLoading(true);
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  }

  function getYoutubeVideoId(url: string | undefined): string | null {
    if (!url) return null;

    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }

  const youtubeVideoId = getYoutubeVideoId(project?.youtubeUrl);

  return (
    <div className={styles.details}>
      <h2 className={styles.title}>{project?.name}</h2>
      <div className={styles.description}>
        {project?.images && project.images.length > 0 ? (
          <div className={styles.photo}>
            <div className={styles.photo_wrapper}>
              {isLoading && <LoadingImage />}
              <Image
                className={styles.photo_image}
                width={1089}
                height={1089}
                src={`${
                  process.env.NEXT_PUBLIC_API_URL
                }/images/get/product?name=${
                  "large_" + project?.images[selectedImageIndex]?.imagePath
                }`}
                alt={project.name}
                onLoadingComplete={() => {
                  setIsLoading(false);
                }}
                onError={() => {
                  setIsLoading(false);
                }}
              />
              {selectedImageIndex > 0 && (
                <button
                  className={styles.photo_button_left}
                  onClick={handleShowPrevImage}
                >
                  <VectorSvg
                    width={34}
                    height={34}
                    color="#fff"
                    className={styles.vector_left}
                  />
                </button>
              )}
              {selectedImageIndex < project?.images?.length - 1 && (
                <button
                  className={styles.photo_button_right}
                  onClick={handleShowNextImage}
                >
                  <VectorSvg
                    width={34}
                    height={34}
                    color="#fff"
                    className={styles.vector_right}
                  />
                </button>
              )}
              <div className={styles.swipe}>
                {project?.images && project.images.length > 0 && (
                  <PaginationComponent
                    totalSteps={project.images.length}
                    currentStep={selectedImageIndex}
                  />
                )}
              </div>
            </div>
          </div>
        ) : project?.defaultImage ? (
          <Image
            className={styles.description_image}
            width={720}
            height={479}
            src={`${process.env.NEXT_PUBLIC_API_URL}/images/get/product?name=${project?.defaultImage}`}
            alt="image"
          />
        ) : null}
        <div className={styles.description_container}>
          <p className={styles.description_paragraph}>{project?.description}</p>
        </div>
      </div>

      {youtubeVideoId && (
        <div className={styles.video}>
          <h3 className={styles.video_title}>Видео</h3>
          <div className={styles.video_wrapper}>
            <iframe
              className={styles.video_iframe}
              src={`https://www.youtube.com/embed/${youtubeVideoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
