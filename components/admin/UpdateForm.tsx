"use client";

import { usePrisma } from "@/app/admin/usePrisma";
import { Field, getModel, getAttributeType, showUrl } from "@/lib/admin";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import StringField from "./fields/StringField";
import IntegerField from "./fields/IntegerField";
import TextField from "./fields/TextField";
import BooleanField from "./fields/BooleanField";
import SelectField from "./fields/SelectField";
import RelationshipHasOneField from "./fields/RelationshipHasOneField";
import JsonField from "./fields/JsonField";

interface Props {
  modelName: string;
  record: object;
}

export default function UpdateForm({ modelName, record: defaultData }: Props) {
  const [data, setData] = useState(defaultData);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const { getPrismaField } = usePrisma();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setSaving(true);
    e.preventDefault();
    try {
      const url = `/api/admin/${modelName}/${data.id}`;
      const response = await axios.put(url, data);
      router.push(showUrl(modelName, response.data));
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: string, value: any) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  // @ts-ignore
  const adminModel = getModel(modelName);

  if (!adminModel) return;
  const { formAttributes } = adminModel;

  return (
    <form onSubmit={onSubmit}>
      <div className="mt-6 border-t border-gray-100 bg-white p-6 shadow-md sm:rounded-lg">
        {formAttributes.map((attribute) => {
          const prismaField = getPrismaField(modelName, attribute);
          const attributeType = getAttributeType(modelName, attribute);

          const defaultFieldProps = {
            field: prismaField,
            value: data[attribute],
            onChange: handleChange,
          };

          return (
            <div key={attributeType.name} className="mb-4">
              {attributeType.type === Field.STRING && (
                <StringField {...defaultFieldProps} />
              )}
              {attributeType.type === Field.TEXT && (
                <TextField {...defaultFieldProps} />
              )}
              {attributeType.type === Field.JSON && (
                <JsonField
                  {...defaultFieldProps}
                  defaultValue={data[attribute]}
                />
              )}
              {attributeType.type === Field.SELECT && (
                <SelectField
                  {...defaultFieldProps}
                  options={attributeType.options || []}
                />
              )}
              {attributeType.type === Field.INTEGER && (
                <IntegerField {...defaultFieldProps} />
              )}
              {attributeType.type === Field.BOOLEAN && (
                <BooleanField {...defaultFieldProps} />
              )}
              {attributeType.type === Field.RELATIONSHIP_HAS_ONE && (
                <RelationshipHasOneField
                  {...defaultFieldProps}
                  value={data[attributeType.sourceKey]}
                  modelName={modelName}
                  attribute={attribute}
                  attributeType={attributeType}
                />
              )}
              {/* <p className="text-xs">{JSON.stringify(prismaField, null, 4)}</p> */}
            </div>
          );
        })}
        <button
          type="submit"
          className="rounded bg-indigo-600 px-3 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
          disabled={saving}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
