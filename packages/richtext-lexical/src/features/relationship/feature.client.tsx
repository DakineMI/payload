'use client'

import { $isNodeSelection } from 'lexical'

import type { FeatureProviderProviderClient } from '../types.js'
import type { RelationshipFeatureProps } from './feature.server.js'

import { RelationshipIcon } from '../../lexical/ui/icons/Relationship/index.js'
import { createClientComponent } from '../createClientComponent.js'
import { slashMenuBasicGroupWithItems } from '../shared/slashMenu/basicGroup.js'
import { toolbarAddDropdownGroupWithItems } from '../shared/toolbar/addDropdownGroup.js'
import { INSERT_RELATIONSHIP_WITH_DRAWER_COMMAND } from './drawer/commands.js'
import { $isRelationshipNode, RelationshipNode } from './nodes/RelationshipNode.js'
import { RelationshipPlugin } from './plugins/index.js'

const RelationshipFeatureClient: FeatureProviderProviderClient<RelationshipFeatureProps> = (
  props,
) => {
  return {
    clientFeatureProps: props,
    feature: () => ({
      clientFeatureProps: props,
      nodes: [RelationshipNode],
      plugins: [
        {
          Component: RelationshipPlugin,
          position: 'normal',
        },
      ],
      slashMenu: {
        groups: [
          slashMenuBasicGroupWithItems([
            {
              Icon: RelationshipIcon,
              key: 'relationship',
              keywords: ['relationship', 'relation', 'rel'],
              label: ({ i18n }) => {
                return i18n.t('lexical:relationship:label')
              },
              onSelect: ({ editor }) => {
                // dispatch INSERT_RELATIONSHIP_WITH_DRAWER_COMMAND
                editor.dispatchCommand(INSERT_RELATIONSHIP_WITH_DRAWER_COMMAND, {
                  replace: false,
                })
              },
            },
          ]),
        ],
      },
      toolbarFixed: {
        groups: [
          toolbarAddDropdownGroupWithItems([
            {
              ChildComponent: RelationshipIcon,
              isActive: ({ selection }) => {
                if (!$isNodeSelection(selection) || !selection.getNodes().length) {
                  return false
                }

                const firstNode = selection.getNodes()[0]
                return $isRelationshipNode(firstNode)
              },
              key: 'relationship',
              label: ({ i18n }) => {
                return i18n.t('lexical:relationship:label')
              },
              onSelect: ({ editor }) => {
                // dispatch INSERT_RELATIONSHIP_WITH_DRAWER_COMMAND
                editor.dispatchCommand(INSERT_RELATIONSHIP_WITH_DRAWER_COMMAND, {
                  replace: false,
                })
              },
            },
          ]),
        ],
      },
    }),
  }
}

export const RelationshipFeatureClientComponent = createClientComponent(RelationshipFeatureClient)