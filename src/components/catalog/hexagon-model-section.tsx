"use client"

import type React from "react"
import { useState } from "react"
import { CuboidIcon as Cube, Layers, PenTool, Package, Box, FileText, Download } from "lucide-react"
import { DownloadSvg } from "@/lib/icon-svg"
import { wrap } from "module"

// Типы для пропсов
interface ModelSectionProps {
  title: string,
  files: {id: number, name: string, type: string}[]
}

// Стили для гексагонального дизайна
const styles = {
  section: {
    // padding: "3rem 2rem",
    // margin: "2rem 0",
    position: "relative" as const,
    overflow: "hidden" as const,
  },

  sectionBg: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.03,
  },

  title: {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "2.5rem",
    color: "#2e7d32",
    textAlign: "center" as const,
    position: "relative" as const,
  },

  grid: {
    display: "flex" as const,
    // gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "10px",
    justifyContent: "flex-start" as const,
    flexWrap: 'wrap'  as const,
    maxWidth: "100%",
    margin: "0 auto",
  },

  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
  },

  button: {
    position: "relative" as const,
    width: "140px",
    height: "67px",
    background: "rgba(246, 246, 246, 1)",
    display: "flex",
    // flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    border: "none",
    padding: "0",
    gap: '5px'
  },

  buttonHover: {
    // transform: "translateY(-10px)",
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
  },

  buttonBg: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, #4caf50, #8bc34a)",
    opacity: 0,
    transition: "opacity 0.3s ease",
    zIndex: 0,
  },

  buttonBgHover: {
    opacity: 0.95,
  },

  iconWrapper: {
    // position: "relative" as const,
    zIndex: 1,
    transition: "all 0.3s ease",
    // marginBottom: "0.5rem",
  },

  icon: {
    // color: "#4caf50",
    transition: "all 0.3s ease",
  },

  wrapper: {
    display: 'flex' as const,
    flexDirection: "column" as const,
  },

  formatName: {
    position: "relative" as const,
    zIndex: 1,
    fontWeight: 600,
    fontSize: "0.9rem",
    color: "#333",
    transition: "all 0.3s ease",
  },

  downloadIcon: {
    position: "absolute" as const,
    bottom: "15%",
    opacity: 0,
    color: "white",
    transition: "all 0.3s ease",
    zIndex: 1,
  },

  formatLabel: {
    position: "relative" as const,
    zIndex: 1,
    fontSize: "0.7rem",
    color: "#666",
    marginTop: "0.25rem",
    transition: "all 0.3s ease",
  },
}

export const HexagonModelSection: React.FC<ModelSectionProps> = ({ title, files }) => {
  // Состояния для отслеживания наведения
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  // Данные о форматах файлов
  const fileFormats = [
    {
      type: '3ds',
      name: "3ds Max",
      shortName: "3ds",
      icon: DownloadSvg,
      description: "3D модель",
    },
    {
      type: 'max',
      name: "Max",
      shortName: "max",
      icon: DownloadSvg,
      description: "3D модель",
    },
    {
      type: 'dwg',
      name: "AutoCAD",
      shortName: "dwg",
      icon: DownloadSvg,
      description: "Чертеж",
    },
    {
      type: 'obj',
      name: "OBJ",
      shortName: "obj",
      icon: DownloadSvg,
      description: "3D объект",
    },
    {
      type: 'fbx',
      name: "FBX",
      shortName: "fbx",
      icon: DownloadSvg,
      description: "3D модель",
    },
    {
      type: 'pdf',
      name: "PDF",
      shortName: "pdf",
      icon: DownloadSvg,
      description: "Документ",
    },
  ]

  const map: Map<string, { type: string; name: string; shortName: string; icon: any; description: string }> = new Map(
      fileFormats.map(format => [format.type, format])
  );

  // Функция для обработки клика по кнопке
  const handleDownload = async (fileName: string) => {

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/files/${fileName}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Ошибка скачивания: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Ошибка при скачивании файла:", error);
    }
  }

  return (
    <div style={styles.section}>
      {/*<div style={styles.sectionBg}></div>*/}
      {/*<h2 style={styles.title}>{title}</h2>*/}
      <div style={styles.grid}>
        {files.map((format) => {
          const Icon = map.get(format.type)?.icon
          const shortName = map.get(format.type)?.shortName
          const name = map.get(format.type)?.name
          const description = map.get(format.type)?.description
          const isHovered = hoveredItem === format.id

          return (
            <div key={format.id} style={styles.buttonWrapper}>
              <button
                style={{
                  ...styles.button,
                }}
                onMouseEnter={() => setHoveredItem(format.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => handleDownload(format.name)}
              >
                {/* <div
                  style={{
                    ...styles.buttonBg,
                  }}
                ></div> */}

                <div style={styles.iconWrapper}>
                  <Icon
                    size={24}
                    style={{
                      ...styles.icon,
                    }}
                  />
                </div>
                  <div style={styles.wrapper}>

                <span
                  style={{
                    ...styles.formatName,
                  }}
                >
                  {shortName}
                </span>

                <span
                  style={{
                    ...styles.formatLabel,
                  }}
                >
                  {description}
                </span>
                  </div>

                {/* <Download
                  size={18}
                  style={{
                    ...styles.downloadIcon,
                  }}
                /> */}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

