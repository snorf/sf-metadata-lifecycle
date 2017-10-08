<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <fieldUpdates>
        <fullName>Set_Type_to_Customer</fullName>
        <field>Type</field>
        <literalValue>Customer</literalValue>
        <name>Set Type to Customer</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Set_Type_to_Pending</fullName>
        <field>Type</field>
        <literalValue>Pending</literalValue>
        <name>Set Type to Pending</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Set_Type_to_Prospect</fullName>
        <field>Type</field>
        <literalValue>Prospect</literalValue>
        <name>Set Type to Prospect</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <rules>
        <fullName>Owner Change</fullName>
        <active>false</active>
        <formula>ISCHANGED( OwnerId )</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
</Workflow>
