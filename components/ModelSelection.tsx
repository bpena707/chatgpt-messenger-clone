'use client'
import useSWR from "swr";
import Select from "react-select";

//fectch to call api engines then pass json response 
const fetchModels = () => fetch("api/getEngines").then((res) => res.json())

function ModelSelection() {
    const { data: models, isLoading } = useSWR("models, fetchModels")
  return (
    <div>
        <Select
            className="mt-2"
            options={models?.modelOptions}
            // defaultValue={model}
            // placeholder={model}
            isSearchable
            isLoading={isLoading}
            menuPosition="fixed"
            classNames={{
                control: (state) => "bg-[#434654] border-[#434654]"
            }}
        />
    </div>
  )
}

export default ModelSelection