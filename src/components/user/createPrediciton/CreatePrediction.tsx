import { useEffect, useState } from "react";
import axios from "axios";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useAuth } from "../../../context/AuthContext";
import { ApiConfig } from "../../../config/ApiConfig";
import "./createPredicition.scss";
import type { Teams } from "../../../types/Teams";

const SortableTeamItem = ({ team }: { team: Teams }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: team.teamId!
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    background: isDragging ? "#f3e8ff" : "#ffffff",
    cursor: "grab"
  };

  return (
    <div className="team-item" ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <img src={team.logoUrl} alt={team.shortName} />
      <span>{team.name}</span>
    </div>
  );
};

const CreatePrediction = () => {
  const [orderedTeams, setOrderedTeams] = useState<Teams[]>([]);
  const { user, accessToken } = useAuth();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor)
  );

  useEffect(() => {
    axios
      .get(ApiConfig.API_URL + "api/teams", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((res) => setOrderedTeams(res.data))
      .catch(console.error);
  }, []);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = orderedTeams.findIndex((t) => t.teamId === active.id);
      const newIndex = orderedTeams.findIndex((t) => t.teamId === over.id);
      setOrderedTeams(arrayMove(orderedTeams, oldIndex, newIndex));
    }
  };

  const handleSubmit = async () => {
    try {
      const teamIds = orderedTeams.map((team) => team.teamId!);
      await axios.post(
        ApiConfig.API_URL + "api/predictions",
        {
          userId: user?.userId,
          teamIds
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      alert("Predikcija uspešno poslata!");
    } catch (error: any) {
      alert(error.response?.data?.message || "Greška pri slanju predikcije.");
    }
  };

  return (
    <div className="create-prediction">
      <h2>Napravite svoju Premier League predikciju</h2>

      <p className="prediction-info">
        Prevucite timove redosledom kojim mislite da će završiti sezonu. Prvi tim je vaš prvoplasirani,
        a poslednji završava na dnu tabele. Kliknite na dugme da sačuvate predikciju.
      </p>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={orderedTeams.map((team) => team.teamId!)} strategy={verticalListSortingStrategy}>
          <div className="teams-list">
            {orderedTeams.map((team) => (
              <SortableTeamItem key={team.teamId} team={team} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <button className="submit-button" onClick={handleSubmit}>
        Sačuvaj predikciju
      </button>
    </div>
  );
};

export default CreatePrediction;
