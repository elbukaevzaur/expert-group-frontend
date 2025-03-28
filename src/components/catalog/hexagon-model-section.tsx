"use client"

import type React from "react"
import { useState } from "react"
import { CuboidIcon as Cube, Layers, PenTool, Package, Box, FileText, Download } from "lucide-react"

// Типы для пропсов
interface ModelSectionProps {
  title: string,
  files: {id: number, name: string, type: string}[]
}

// Стили для гексагонального дизайна
const styles = {
  section: {
    padding: "3rem 2rem",
    margin: "2rem 0",
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
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "2rem",
    justifyContent: "center",
    maxWidth: "1200px",
    margin: "0 auto",
  },

  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
  },

  button: {
    position: "relative" as const,
    width: "140px",
    height: "160px",
    background: "#f8f9fa",
    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    border: "none",
    padding: "0",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
  },

  buttonHover: {
    transform: "translateY(-10px)",
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
    position: "relative" as const,
    zIndex: 1,
    transition: "all 0.3s ease",
    marginBottom: "0.5rem",
  },

  icon: {
    color: "#4caf50",
    transition: "all 0.3s ease",
  },

  iconHover: {
    color: "white",
    transform: "scale(1.2)",
  },

  formatName: {
    position: "relative" as const,
    zIndex: 1,
    fontWeight: 600,
    fontSize: "0.9rem",
    color: "#333",
    transition: "all 0.3s ease",
  },

  formatNameHover: {
    color: "white",
  },

  downloadIcon: {
    position: "absolute" as const,
    bottom: "15%",
    opacity: 0,
    color: "white",
    transition: "all 0.3s ease",
    zIndex: 1,
  },

  downloadIconHover: {
    opacity: 1,
    transform: "translateY(5px)",
  },

  formatLabel: {
    position: "relative" as const,
    zIndex: 1,
    fontSize: "0.7rem",
    color: "#666",
    marginTop: "0.25rem",
    transition: "all 0.3s ease",
  },

  formatLabelHover: {
    color: "rgba(255, 255, 255, 0.8)",
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
      icon: Cube,
      description: "3D модель",
    },
    {
      type: 'max',
      name: "Max",
      shortName: "max",
      icon: Layers,
      description: "3D модель",
    },
    {
      type: 'dwg',
      name: "AutoCAD",
      shortName: "dwg",
      icon: PenTool,
      description: "Чертеж",
    },
    {
      type: 'obj',
      name: "OBJ",
      shortName: "obj",
      icon: Package,
      description: "3D объект",
    },
    {
      type: 'fbx',
      name: "FBX",
      shortName: "fbx",
      icon: Box,
      description: "3D модель",
    },
    {
      type: 'pdf',
      name: "PDF",
      shortName: "pdf",
      icon: FileText,
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
                  ...(isHovered ? styles.buttonHover : {}),
                }}
                onMouseEnter={() => setHoveredItem(format.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => handleDownload(format.name)}
              >
                <div
                  style={{
                    ...styles.buttonBg,
                    ...(isHovered ? styles.buttonBgHover : {}),
                  }}
                ></div>

                <div style={styles.iconWrapper}>
                  <Icon
                    size={36}
                    style={{
                      ...styles.icon,
                      ...(isHovered ? styles.iconHover : {}),
                    }}
                  />
                </div>

                <span
                  style={{
                    ...styles.formatName,
                    ...(isHovered ? styles.formatNameHover : {}),
                  }}
                >
                  {shortName}
                </span>

                <span
                  style={{
                    ...styles.formatLabel,
                    ...(isHovered ? styles.formatLabelHover : {}),
                  }}
                >
                  {description}
                </span>

                <Download
                  size={18}
                  style={{
                    ...styles.downloadIcon,
                    ...(isHovered ? styles.downloadIconHover : {}),
                  }}
                />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

