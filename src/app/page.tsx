"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedItems, setSelectedItems] = useState<any>({
    item_1: searchParams.get("item_1") === "true" ? true : false,
    item_2: searchParams.get("item_2") === "true" ? true : false,
    item_3: searchParams.get("item_3") === "true" ? true : false,
    item_4: searchParams.get("item_4") === "true" ? true : false,
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(selectedItems).toString();
    router.replace(`?${queryParams}`);
  }, [selectedItems, router]);

  const onChange = (itemId: string, checked: boolean) => {
    setSelectedItems((prevItems: any) => ({ ...prevItems, [itemId]: checked }));
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold italic">websquad</h1>
      <p>Gerênciamento de estado por URL</p>

      <ul className="mt-5 flex flex-col gap-3">
        {Object.keys(selectedItems).map((itemId) => (
          <li key={itemId}>
            <input
              type="checkbox"
              id={itemId}
              className="mr-5"
              checked={selectedItems[itemId]}
              onChange={(e) => onChange(itemId, e.target.checked)}
            />
            <label htmlFor={itemId}>{itemId}</label>
          </li>
        ))}
      </ul>
      <button
        onClick={() =>
          setSelectedItems({
            item_1: false,
            item_2: false,
            item_3: false,
            item_4: false,
          })
        }
        className="border border-white p-3 rounded-2xl mt-3"
      >
        Limpar seleção
      </button>
    </div>
  );
}
