"use client";

import styles from "@/app/projects/[projectsCategoriesId]/projects.module.css";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { getAllProjects } from "@/lib/http/projectsRequest";
import { ProjectsListResponse } from "@/lib/models/projects";
import Link from "next/link";
import ListNotContent from "@/components/ListNotContent";

interface Props {
  projectsCategoriesId: string | string[] | undefined;
}

export default function ProjectsList(props: Props) {
  const { allProjectsCategories } = useAppSelector(
    (state) => state.projectsCategories
  );
  const [projects, setProjects] = useState<ProjectsListResponse[]>([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const mobileSelectRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (props.projectsCategoriesId)
      loadProjects(Number(props.projectsCategoriesId));
    else loadProjects();
  }, [props.projectsCategoriesId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileSelectRef.current && !mobileSelectRef.current.contains(event.target as Node)) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelectedProjectCategory(id?: number) {
    if (id === undefined) router.push(`/projects`);
    else router.push(`/projects/${id}`);
  }

  function loadProjects(projectsCategoriesId?: number) {
    getAllProjects(projectsCategoriesId).then((resp) => {
      setProjects(resp.data);
    });
  }

  const selectedCategoryName = props.projectsCategoriesId
    ? allProjectsCategories.find(
        (cat) => cat.id.toString() === props.projectsCategoriesId
      )?.name
    : "Все";

  return (
    <div className={styles.projects}>
      <h2 className={styles.title}>Проекты</h2>
      <div className={styles.filter}>
        <button
          className={`${styles.filter_button} ${
            undefined === props.projectsCategoriesId && styles.filter_button_active
          }`}
          onClick={() => handleSelectedProjectCategory(undefined)}
        >
          Все
        </button>
        {allProjectsCategories.map((item, index) => {
          return (
            <button
              key={index}
              className={`${styles.filter_button} ${
                item.id.toString() === props.projectsCategoriesId &&
                styles.filter_button_active
              }`}
              onClick={() => handleSelectedProjectCategory(item.id)}
            >
              {item.name}
            </button>
          );
        })}
        <div className={styles.mobileFilterWrapper} ref={mobileSelectRef}>
          <button
            className={`${styles.mobileFilterButton} ${
              isMobileOpen ? styles.mobileFilterButtonOpen : ""
            }`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {selectedCategoryName}
            <span className={styles.mobileFilterArrow}>
              <svg
            className={`${styles.arrow} ${isMobileOpen ? styles.arrow_open : ""}`}
            width="16"
            height="10"
            viewBox="0 0 16 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 1.5L8 8.5L1 1.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
            </span>
          </button>
          {isMobileOpen && (
            <div className={styles.mobileFilterDropdown}>
              <button
                className={`${styles.mobileFilterOption} ${
                  undefined === props.projectsCategoriesId
                    ? styles.mobileFilterOptionActive
                    : ""
                }`}
                onClick={() => {
                  handleSelectedProjectCategory(undefined);
                  setIsMobileOpen(false);
                }}
              >
                Все
              </button>
              {allProjectsCategories.map((item, index) => (
                <button
                  key={index}
                  className={`${styles.mobileFilterOption} ${
                    item.id.toString() === props.projectsCategoriesId
                      ? styles.mobileFilterOptionActive
                      : ""
                  }`}
                  onClick={() => {
                    handleSelectedProjectCategory(item.id);
                    setIsMobileOpen(false);
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {projects.length == 0 ? (
        <div style={{ marginTop: 20 }}>
          <ListNotContent text="Список проектов пуст" />
        </div>
      ) : (
        <div className={styles.items}>
          {projects.map((item, index) => {
            return (
              <Link
                href={`/projects/${item.projectCategoryId}/details/${item.id}`}
                key={index}
                className={styles.item}
              >
                {item.defaultImage === null ? (
                  <Image
                    className={styles.item_image}
                    src={"/images/Project1.png"}
                    alt="Image"
                    width={286}
                    height={201}
                  />
                ) : (
                  <img
                    className={styles.item_image}
                    width={286}
                    height={201}
                    src={`${
                      process.env.NEXT_PUBLIC_API_URL
                    }/images/get/product?name=${"small_" + item.defaultImage}`}
                    alt={item.name}
                  />
                )}
                <div className={styles.item_description}>
                  <h2 className={styles.item_title}>{item.category.name}</h2>
                  <p className={styles.item_subtitle}>
                    {item.address}, {item.name}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}