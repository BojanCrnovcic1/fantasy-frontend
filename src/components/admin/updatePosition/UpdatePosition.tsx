import { useEffect, useState } from "react";
import axios from "axios";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./updatePosition.scss";
import { ApiConfig } from "../../../config/ApiConfig";

interface Team {
  teamId: number;
  name: string;
}

interface ActualStandings {
  actualStandingId?: number;
  seasonYear: number;
  teamId: number;
  position: number;
  updateAt: Date;
  team: Team;
}

const UpdatePosition = () => {
  const [standings, setStandings] = useState<ActualStandings[]>([]);
  const [seasonYear, setSeasonYear] = useState<number>(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    })
  );

  useEffect(() => {
    if (seasonYear) {
      fetchStandings();
    }
  }, [seasonYear]);

  const fetchStandings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(ApiConfig.API_URL + `api/standings/${seasonYear}`);
      setStandings(res.data);
      setError(null);
    } catch (err) {
      setError("Greška prilikom učitavanja tabele.");
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = standings.findIndex((item) => item.teamId === +active.id);
      const newIndex = standings.findIndex((item) => item.teamId === +over.id);

      const updatedList = arrayMove(standings, oldIndex, newIndex);
      setStandings(updatedList);

      try {
        await axios.patch(ApiConfig.API_URL + "api/standings/update-position", {
          seasonYear,
          teamId: +active.id,
          newPosition: newIndex + 1,
        });
        await fetchStandings();
      } catch (err) {
        setError("Greška prilikom ažuriranja pozicije.");
      }
    }
  };

  return (
    <div className="update-position">
      <h2>📊 Ažuriranje pozicija u tabeli</h2>

      <div className="season-input">
        <label htmlFor="year">Godina sezone:</label>
        <input
          id="year"
          type="number"
          value={seasonYear}
          onChange={(e) => setSeasonYear(Number(e.target.value))}
          min={2000}
          max={2100}
        />
      </div>

      {error && <div className="error">{error}</div>}

      {loading ? (
        <p>Učitavanje...</p>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={standings.map((item) => item.teamId.toString())}
            strategy={verticalListSortingStrategy}
          >
            <table>
              <thead>
                <tr>
                  <th>Pozicija</th>
                  <th>Tim</th>
                  <th>Ažurirano</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((item) => (
                  <SortableRow key={item.teamId} item={item} />
                ))}
              </tbody>
            </table>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};

export default UpdatePosition;

const SortableRow = ({ item }: { item: ActualStandings }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.teamId.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    background: isDragging ? "#d0e6ff" : "white",
    cursor: "grab",
    touchAction: "none",
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <td data-label="Pozicija">{item.position}</td>
      <td data-label="Tim">{item.team.name}</td>
      <td data-label="Ažurirano">{new Date(item.updateAt).toLocaleString()}</td>
    </tr>
  );
};

